import { styles, login, fetchChannel } from "../lib/constants/index.js";

const sendMsg = async function (
  userType: string,
  token: string,
  channel: string,
  content: string,
  apiURL: string = "https://api.revolt.chat/"
) {
  // if any args are missing, throw errors before doing anything
  if (!userType) {
    console.log(
      styles.error(
        "You need to specify whether the account is a user or a bot (--user/--bot), a token, a channel ID, the content of the message and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!token) {
    console.log(
      styles.error(
        "You need to specify a token, a channel ID, the content of the message and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!channel) {
    console.log(
      styles.error(
        "You need to specify a channel ID, the content of the message and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!content) {
    console.log(
      styles.error(
        "You need to specify the content of the message and optionally a custom API URL (both in quotes)."
      )
    );
    return process.exit(1);
  }

  // log in
  const client = await login(token, apiURL, userType);
  console.log(styles.info("[INFO] Logged in."));

  client.on("ready", async () => {
    const channel2 = await fetchChannel(client, channel);
    console.log(styles.info("[INFO] The channel has been found."));

    // send the message
    try {
      await channel2!.sendMessage(content);
      console.log(styles.success("Your message has successfuly been sent."));
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue sending the message.\n\nThe error was: ${error}`
        )
      );
    }

    // for SOME reason we need to end the process manually after sending the message - is something lingering?
    return process.exit(0);
  });
};

export { sendMsg };
