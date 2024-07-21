import { Channel, Client, Message } from "revolt.js";

import { styles, strings } from "./index.js";

const checkIfBot = function (input: string) {
  switch (input) {
    case "--bot":
      return true;
    case "--user":
      return false;
    default:
      return "invalid";
  }
};

const login = async function (token: string, apiURL: string, userType: string) {
  const client = new Client({ baseURL: apiURL });
  const isBot = checkIfBot(userType);
  if (isBot === "invalid") {
    console.log(
      styles.error(
        `The specified account type (${userType}) was invalid - use --user or --bot.`
      )
    );
    return process.exit(1);
  }
  try {
    if (isBot) {
      await client.loginBot(token);
    } else {
      await client.useExistingSession({
        _id: "",
        token,
        user_id: "",
      });
      client.connect();
    }

    return client;
  } catch (error: any) {
    console.log(strings.global.errors.loginFailed(error));
    return process.exit(1);
  }
};

const fetchChannel = async function (client: Client, channel: string) {
  try {
    const chnl = client.channels?.get(channel);
    if (chnl === undefined) throw Error(`Channel is undefined (${chnl})`);
    return chnl;
  } catch (error) {
    console.log(
      styles.error(
        `There was an issue getting the channel - is the ID correct?\nThe error was: ${error}`
      )
    );
    return process.exit(1);
  }
};

const renderMessages = async function (
  channel: Channel,
  useLegacyBehaviour: boolean,
  amount: number = 10,
  message?: Message
) {
  // common code
  function contentToSend(msg: Message) {
    if (msg.content === "") {
      if (msg.systemMessage === undefined) {
        return "No content.";
      } else {
        return msg.systemMessage.type;
      }
    } else {
      return msg.content;
    }
  }

  function messageRenderer(msg: Message) {
    const content = contentToSend(msg);
    return `${styles.info(
      `${msg.author?.username} (${msg.authorId}) - ${msg.id} (${msg.createdAt})`
    )}\n${content}`;
  }

  // if a message has not been passed, fetch the provided amount of messages and render those instead
  if (!message) {
    const msgs = await channel.fetchMessages({
      limit: amount,
      sort: "Latest",
    });
    if (!msgs.length) return "noMsgs";
    if (useLegacyBehaviour)
      console.log(styles.success("Sucessfully fetched messages!"));
    let rawoutput = [] as string[];
    const sortedMsgs = msgs.sort(
      (msg, msg2) => msg.createdAt.valueOf() - msg2.createdAt.valueOf()
    );
    sortedMsgs.forEach((msg) => {
      const obj = messageRenderer(msg);
      rawoutput.push(obj);
    });
    const output =
      (useLegacyBehaviour ? styles.header("Messages (oldest first):\n") : "") +
      rawoutput.join("\n");
    return output;
  }
};

export { checkIfBot, renderMessages, fetchChannel, login };
