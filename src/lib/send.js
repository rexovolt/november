import { Client } from "revolt.js";

import styles from "./styles.js";

const sendMsg = function (userType, token, channel, content) {
  // if any args are missing, throw errors before doing anything
  if (!userType)
    return (
      console.log(
        styles.error(
          "You need to specify if the account is a user or a bot (--user or --bot), a token, a channel ID and the content of the message (all in quotes)."
        )
      ) && process.exit()
    );
  if (!token)
    return (
      console.log(
        styles.error(
          "You need to specify a token, a channel ID and the content of the message (all in quotes)."
        )
      ) && process.exit()
    );
  if (!channel)
    return (
      console.log(
        styles.error(
          "You need to specify a channel ID and the content of the message (both in quotes)."
        )
      ) && process.exit()
    );
  if (!content)
    return (
      console.log(
        styles.error(
          "You need to specify the content of the message (in quotes)."
        )
      ) && process.exit()
    );

  // check and get user type
  const checkIfUser = function (type) {
    switch (type) {
      case "--user":
        return true;
      case "--bot":
        return false;
      default:
        return "invalid";
    }
  };
  const isUser = checkIfUser(userType);
  if (isUser === "invalid")
    console.log(
      styles.error(
        "The user type was invalid - make sure to specify if you're using a seisson token (--user) or a bot token (--bot)."
      )
    );

  // log in
  const client = new Client();
  try {
    isUser ? client.useExistingSession(token) : client.loginBot(token);
    console.log(styles.info("[INFO] Logged in."));
  } catch (error) {
    console.log(
      styles.error(
        `There was an issue logging in - are your token and user type correct?\nThe issue was: ${error}`
      )
    );
  }

  client.on("ready", async () => {
    try {
      const chnl = client.channels?.get(channel);
      if (chnl === undefined) throw error;
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue getting the channel - is the ID correct?\nThe error was: ${error}`
        )
      ) && client.logout();
      process.exit();
    }

    const channel2 = client.channels?.get(channel);
    console.log(styles.info("[INFO] The channel has been found."));

    // send the message
    try {
      await channel2.sendMessage(content);
      console.log(styles.success("Your message has successfuly been sent."));
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue sending the message.\n\nThe error was: ${error}`
        )
      );
    }

    // for SOME reason we need to end the process manually after sending the message - is something lingering?
    process.kill(process.pid);
  });
};

export { sendMsg };
