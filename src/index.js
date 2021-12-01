#! /usr/bin/env node

import chalk from "chalk";
import { kick, styles, sendMsg } from "./lib/index.js";
import { promises as fs } from "fs";

const [nodeExec, scriptPath, command, ...args] = process.argv;

if (command) {
  switch (command) {
    case "-send":
      if (args.length > 4)
        console.log(
          styles.error(
            "You've specified more than 4 arguments - did you quote your message correctly?"
          )
        );
      sendMsg(args[0], args[1], args[2], args[3]);
      break;
    case "-kick":
      if (args.length > 4)
        console.log(styles.error("You've specified more than 4 arguments."));
      kick(args[0], args[1], args[2], args[3]);
      break;
    case "-help":
      // get version data from package.json
      try {
        JSON.parse(await fs.readFile("package.json"));
      } catch (error) {
        console.log(
          styles.error(`There was an issue geting Termivolt's version.`)
        );
      }

      const data = JSON.parse(await fs.readFile("package.json"));

      // send help message
      console.log(
        `${styles.title(
          `Termivolt v${data.version}`
        )}\nTermivolt is a simple utility to interact with the Revolt API via the command line.\n\n${styles.header(
          "Commands:\n"
        )}${chalk.bold(
          "-send:"
        )} Sends a message via the specified account.\n${chalk.underline(
          "Example usage:"
        )} termviolt -send <(--user/--bot)> <token> <channel ID> <message content (in quotes)>\n${chalk.underline(
          "Notes:"
        )} Formatting may be broken in some cases. In addition, sending via user accounts (using session tokens) currently seems to be broken - a fix will be released in the future.\n\n${chalk.bold(
          "-kick:"
        )} Kicks a member from the specified server.\n${chalk.underline(
          "Example usage:"
        )} termviolt -kick <(--user/--bot)> <token> <server ID> <user ID>\n${chalk.underline(
          "Notes:"
        )} This requires the Kick Members permission - if you get a 403 error, this might be why. In addition, sending via user accounts (using session tokens) currently seems to be broken - a fix will be released in the future.`
      );
      break;
    default:
      console.log(
        styles.error(
          "Unrecognised command - use -help or check the README for more information."
        )
      );
      break;
  }
} else {
  console.log(
    styles.error(
      "You need to provide some arguments - use -help or check the README for more information."
    )
  );
}
