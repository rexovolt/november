import chalk from "chalk";

import { styles } from "../lib/index.js";
import packageinfo from "../../package.json" assert { type: "json" };

const help = function () {
  return console.log(
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
      "-interactive:"
    )} Use Termivolt as an interactive client.\n${chalk.underline(
      "Example usage:"
    )} termviolt -interactive <(--user/--bot)> <token> [custom API URL]\n${chalk.underline(
      "Notes:"
    )} This command does not take any extra arguments.\n\n${chalk.bold(
      "-fetch:"
    )} Fetches the specified amount of messages from the specified channel.\n${chalk.underline(
      "Example usage:"
    )} termviolt -fetch <(--user/--bot)> <token> <channel ID> <message count> [custom API URL]\n${chalk.underline(
      "Notes:"
    )} This requires the View Channel permission - if you get a 403 error, this might be why.\nMessages are not formatted.\n\n${chalk.bold(
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
};

export { help };
