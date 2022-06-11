#! /usr/bin/env node --no-warnings --experimental-specifier-resolution=node --experimental-json-modules

import chalk from "chalk";
import {
  archive,
  ban,
  fetchMsgs,
  kick,
  rmFromGroup,
  sendMsg,
} from "./commands/index.js";
import { strings, styles } from "./lib/index.js";
import packageinfo from "../package.json" assert { type: "json" };

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
    case "-ban":
      if (args.length > 4)
        console.log(styles.error("You've specified more than 4 arguments."));
      ban(args[0], args[1], args[2], args[3]);
      break;
    case "-rmfromgroup":
      if (args.length > 4)
        console.log(styles.error("You've specified more than 4 arguments."));
      rmFromGroup(args[0], args[1], args[2], args[3]);
      break;
    case "-archive":
      if (args.length > 4)
        console.log(styles.error("You've specified more than 4 arguments."));
      archive(args[0], args[1], args[2], args[3]);
      break;
    case "-fetch":
      if (args.length > 4)
        console.log(styles.error("You've specified more than 4 arguments."));
      fetchMsgs(args[0], args[1], args[2], args[3]);
      break;
    case "-help":
      // send help message
      console.log(
        `${styles.title(
          `Termivolt v${packageinfo.version}`
        )}\nTermivolt is a simple utility to interact with the Revolt API via the command line.\n\n${styles.header(
          "Commands:\n"
        )}${chalk.bold(
          "-send:"
        )} Sends a message via the specified account.\n${chalk.underline(
          "Example usage:"
        )} termviolt -send <(--user/--bot)> <token> <channel ID> <message content (in quotes)> [custom API URL]\n${chalk.underline(
          "Notes:"
        )} Formatting may be broken in some cases.\n\n${chalk.bold(
          "-fetch:"
        )} Fetches the specified amount of messages from the specified channel.\n${chalk.underline(
          "Example usage:"
        )} termviolt -fetch <(--user/--bot)> <token> <channel ID> <message count> [custom API URL]\n${chalk.underline(
          "Notes:"
        )} This requires the View Channel permission - if you get a 403 error, this might be why.\nMessages are listed newest-first and will not be formatted.\n\n${chalk.bold(
          "-archive:"
        )} Archives the specified channel.\n${chalk.underline(
          "Example usage:"
        )} termviolt -archive <(--user/--bot)> <token> <channel ID> [custom API URL]\n${chalk.underline(
          "Notes:"
        )} This requires the View Channel permission - if you get a 403 error, this might be why. ${chalk.bold(
          "This may take a while!"
        )}\n\n${chalk.bold(
          "-kick:"
        )} Kicks a member from the specified server.\n${chalk.underline(
          "Example usage:"
        )} termviolt -kick <(--user/--bot)> <token> <server ID> <user ID> [custom API URL]\n${chalk.underline(
          "Notes:"
        )} This requires the Kick Members permission - if you get a 403 error, this might be why.\n\n${chalk.bold(
          "-rmfromgroup:"
        )} Removes a member from the specified group.\n${chalk.underline(
          "Example usage:"
        )} termviolt -rmfromgroup <(--user/--bot)> <token> <server ID> <user ID> [custom API URL]\n${chalk.underline(
          "Notes:"
        )} This requires you to own the group - if you get a 403 error, this might be why.\n\n${chalk.bold(
          "-ban:"
        )} Bans a member from the specified server.\n${chalk.underline(
          "Example usage:"
        )} termviolt -ban <(--user/--bot)> <token> <server ID> <user ID> [custom API URL]\n${chalk.underline(
          "Notes:"
        )} This requires the Ban Members permission - if you get a 403 error, this might be why.`
      );
      break;
    default:
      console.log(strings.global.errors.unrecognisedCommand(command));
      break;
  }
} else {
  console.log(
    styles.error(
      "You need to provide some arguments - use -help or check the README for more information."
    )
  );
}
