import { Client } from "revolt.js";

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
  const client = new Client({ apiURL });
  const isBot = checkIfBot(userType);
  if (isBot === "invalid") {
    console.log(
      styles.error(
        `The specified account type (${userType}) was invalid - use --user or --bot.`
      )
    );
    process.exit();
  }
  try {
    isBot
      ? client.loginBot(token)
      : client.useExistingSession({ token, user_id: "", name: "" });
    return client;
  } catch (error: any) {
    console.log(strings.global.errors.loginFailed(error));
    process.exit();
  }
};

const fetchChannel = async function (client: Client, channel: string) {
  try {
    const chnl = client.channels?.get(channel);
    if (chnl === undefined) throw Error;
    return chnl;
  } catch (error) {
    console.log(
      styles.error(
        `There was an issue getting the channel - is the ID correct?\nThe error was: ${error}`
      )
    );
    client.logout();
    process.exit();
  }
};

export { checkIfBot, fetchChannel, login };
