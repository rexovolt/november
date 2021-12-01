import { Client } from "revolt.js";

import styles from "./styles.js";

const kick = function (userType, token, server, userid) {
  // if any args are missing, throw errors before doing anything
  if (!userType)
    return (
      console.log(
        styles.error(
          "You need to specify if the account is a user or a bot (--user or --bot), a token, a server ID and the ID of the user to kick (all in quotes)."
        )
      ) && process.exit()
    );
  if (!token)
    return (
      console.log(
        styles.error(
          "You need to specify a token, a server ID and the ID of the user to kick (the last two in quotes)."
        )
      ) && process.exit()
    );
  if (!server)
    return (
      console.log(
        styles.error(
          "You need to specify a server ID and the ID of the user to kick (both in quotes)."
        )
      ) && process.exit()
    );
  if (!userid)
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
      const srv = client.servers?.get(server);
      if (srv === undefined) throw error;
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue getting the server - is the ID correct?\nThe error was: ${error}`
        )
      ) && client.logout();
      process.exit();
    }

    const server2 = client.servers?.get(server);
    console.log(styles.info("[INFO] The server has been found."));

    // send the message
    try {
      await (await server2.fetchMember(userid)).kick();
      console.log(styles.success("The user has been kicked."));
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

export { kick };
