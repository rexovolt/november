import { Message } from "revolt.js";
import {
  styles,
  login,
  renderMessages,
  fetchChannel,
} from "../lib/constants/index.js";

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
    return process.exit(1);
  }
  if (!token) {
    console.log(
      styles.error(
        "You need to specify a token, a channel ID, the number of messages to fetch (max 100) and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!channel) {
    console.log(
      styles.error(
        "You need to specify a channel ID, the number of messages to fetch (max 100) and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!rawAmount) {
    console.log(
      styles.error(
        "You need to specify the number of messages to fetch (max 100) and optionally a custom API URL (all in quotes)."
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
      const amount = parseInt(rawAmount);
      const output = await renderMessages(channel2, true, amount);
      if (output === "noMsgs") {
        console.log(styles.error("There aren't any messages to display!"));
        return process.exit(1);
      }

      console.log(output);
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue fetching the channel's messages.\n\nThe error was: ${error}`
        )
      );
    }

    // for SOME reason we need to end the process manually - is something lingering?
    return process.exit(0);
  });
};

export { fetchMsgs };
