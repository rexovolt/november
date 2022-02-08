import { styles } from "./index.js";

export default {
  ban: {},
  kick: {},
  send: {},
  global: {
    errors: {
      cannotFetchObject: (object: string, error: string) => {
        return styles.error(
          `There was an issue getting the ${object} - is the ID correct?\nThe error was: ${error}`
        );
      },
    },
    infoMsgs: {
      loggedIn: styles.info("[INFO] Logged in."),
      objectHasBeenFound: (object: string) => {
        return styles.info(`[INFO] The ${object} has been found.`);
      },
    },
  },
};
