import { Message } from "revolt.js";
import { styles, login, fetchChannel } from "../lib/constants/index.js";

const fetchMsgs = async function (
  userType: string,
  token: string,
  channel: string,
  rawAmount: string,
  apiURL: string = "https://api.revolt.chat/"
) {
  // if any args are missing, throw errors before doing anything
  if (!userType) {
    console.log(
      styles.error(
        "You need to specify whether the account is a user or a bot (--user/--bot), a token, a channel ID, the number of messages to fetch (max 100) and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit();
  }
  if (!token) {
    console.log(
      styles.error(
        "You need to specify a token, a channel ID, the number of messages to fetch (max 100) and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit();
  }
  if (!channel) {
    console.log(
      styles.error(
        "You need to specify a channel ID, the number of messages to fetch (max 100) and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit();
  }
  if (!rawAmount) {
    console.log(
      styles.error(
        "You need to specify the number of messages to fetch (max 100) and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit();
  }

  // log in
  const client = await login(token, apiURL, userType);
  console.log(styles.info("[INFO] Logged in."));

  client.on("ready", async () => {
    const channel2 = await fetchChannel(client, channel);
    console.log(styles.info("[INFO] The channel has been found."));

    // send the message
    try {
      const amount = parseInt(rawAmount);
      const msgs = await channel2!.fetchMessages({
        limit: amount,
        sort: "Latest",
      });
      if (!msgs.length) {
        console.log(styles.error("There aren't any messages to archive!"));
        process.kill(process.pid);
      }
      console.log(styles.success("Sucessfully fetched messages!"));
      let rawoutput = [""];
      function contentToSend(msg: Message) {
        if (msg.content === null) {
          if (msg.system === null) {
            return "No content.";
          } else {
            return msg.system?.type;
          }
        } else {
          return msg.content;
        }
      }
      msgs.forEach((msg) => {
        const content = contentToSend(msg);
        const obj = `${styles.info(
          `${msg.author?.username} (${msg.author_id}) - ${msg._id} (${msg.createdAt})`
        )}\n${content}`;
        rawoutput.push(obj);
      });
      const output =
        styles.header("Messages (newest first):\n") + rawoutput.join("\n");
      console.log(output);
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue fetching the channel's messages.\n\nThe error was: ${error}`
        )
      );
    }

    // for SOME reason we need to end the process manually after sending the message - is something lingering?
    process.kill(process.pid);
  });
};

export { fetchMsgs };
