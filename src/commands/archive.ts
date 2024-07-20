import { archiveChannel } from "revchiver/dist";
import { styles, login, fetchChannel } from "../lib/constants/index.js";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const archive = async function (
  userType: string,
  token: string,
  channel: string,
  apiURL: string = "https://api.revolt.chat/"
) {
  // if any args are missing, throw errors before doing anything
  if (!userType) {
    console.log(
      styles.error(
        "You need to specify whether the account is a user or a bot (--user/--bot), a token, the channel's ID and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!token) {
    console.log(
      styles.error(
        "You need to specify a token, the channel's ID and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!channel) {
    console.log(
      styles.error(
        "You need to specify the channel's ID and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }

  // log in
  const client = await login(token, apiURL, userType);
  console.log(styles.info("[INFO] Logged in."));

  client.on("ready", async () => {
    // send the message
    try {
      const c = await fetchChannel(client, channel);
      const msgs = await c.fetchMessages({ limit: 1 });
      if (!msgs.length) {
        console.log(
          styles.error("[PRE-ARCHIVE] There aren't any messages to archive!")
        );
        return process.exit(1);
      } else {
        const msg = msgs[0];
        console.log(styles.info("[INFO] Starting archival process..."));
        const archiveData = await archiveChannel(msg);
        console.log(styles.info("[INFO] Preparing file..."));
        const rawjson = JSON.stringify(archiveData, null, 4);

        // remove empty pair of curly brackets ({}); also, just in case...
        // prettier-ignore
        const regex = new RegExp("        {},\n");
        const json = rawjson.replace(regex, "");

        // define filenames
        const filename = `archive_${msg.channel_id}_${msg.createdAt}.json`;
        const dir = `archives/${filename}`;

        const __dirname = path.resolve();
        const dirToMake = path.resolve(__dirname, "archives");
        const resolvedDir = path.resolve(__dirname, dir);

        // write to file
        try {
          await mkdir(dirToMake);
        } catch (e) {
          null; // banish error to the void
        }
        await writeFile(dir, json);

        console.log(
          styles.success(
            `The channel has been archived! You can find the file at ${resolvedDir}.`
          )
        );
      }
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue archiving the channel - do you have access to it?\n\nThe error was: ${error}`
        )
      );
    }

    // for SOME reason we need to end the process manually - is something lingering?
    return process.exit(0);
  });
};

export { archive };
