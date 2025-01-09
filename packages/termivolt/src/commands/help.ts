import os from "os";
import picocolors from "picocolors";

import { builtTimestamp, styles, version } from "../lib/index.js";

const help = function (debug?: boolean) {
  return console.log(
    `${styles.title(
      `Termivolt v${version}${
        debug
          ? ` (built ${builtTimestamp}; ${os.version} ${os.release} w/Node ${process.version})`
          : ""
      }`
    )}\nTermivolt is a simple utility to interact with the Revolt API via the command line.\n\n${styles.header(
      "Commands:\n"
    )}${picocolors.bold(
      "-send:"
    )} Sends a message via the specified account.\n${picocolors.underline(
      "Example usage:"
    )} termviolt -send <(--user/--bot)> <token> <channel ID> <message content (in quotes)> [custom API URL]\n${picocolors.underline(
      "Notes:"
    )} Formatting may be broken in some cases.\n\n${picocolors.bold(
      "-interactive:"
    )} Use Termivolt as an interactive client.\n${picocolors.underline(
      "Example usage:"
    )} termviolt -interactive <(--user/--bot)> <token> [custom API URL]\n${picocolors.underline(
      "Notes:"
    )} This command does not take any extra arguments.\n\n${picocolors.bold(
      "-fetch:"
    )} Fetches the specified amount of messages from the specified channel.\n${picocolors.underline(
      "Example usage:"
    )} termviolt -fetch <(--user/--bot)> <token> <channel ID> <message count> [custom API URL]\n${picocolors.underline(
      "Notes:"
    )} This requires the View Channel permission - if you get a 403 error, this might be why.\nMessages are not formatted.\n\n${picocolors.bold(
      "-archive:"
    )} Archives the specified channel.\n${picocolors.underline(
      "Example usage:"
    )} termviolt -archive <(--user/--bot)> <token> <channel ID> [custom API URL]\n${picocolors.underline(
      "Notes:"
    )} This requires the View Channel permission - if you get a 403 error, this might be why. ${picocolors.bold(
      "This may take a while!"
    )}\n\n${picocolors.bold(
      "-kick:"
    )} Kicks a member from the specified server.\n${picocolors.underline(
      "Example usage:"
    )} termviolt -kick <(--user/--bot)> <token> <server ID> <user ID> [custom API URL]\n${picocolors.underline(
      "Notes:"
    )} This requires the Kick Members permission - if you get a 403 error, this might be why.\n\n${picocolors.bold(
      "-rmfromgroup:"
    )} Removes a member from the specified group.\n${picocolors.underline(
      "Example usage:"
    )} termviolt -rmfromgroup <(--user/--bot)> <token> <server ID> <user ID> [custom API URL]\n${picocolors.underline(
      "Notes:"
    )} This requires you to own the group - if you get a 403 error, this might be why.\n\n${picocolors.bold(
      "-ban:"
    )} Bans a member from the specified server.\n${picocolors.underline(
      "Example usage:"
    )} termviolt -ban <(--user/--bot)> <token> <server ID> <user ID> [custom API URL]\n${picocolors.underline(
      "Notes:"
    )} This requires the Ban Members permission - if you get a 403 error, this might be why.`
  );
};

export { help };
