#! /usr/bin/env node

import {
  archive,
  ban,
  fetchMsgs,
  help,
  interactive,
  kick,
  rmFromGroup,
  sendMsg,
} from "./commands/index.js";
import { strings, styles } from "./lib/index.js";

const [_nodeExec, _scriptPath, command, ...args] = process.argv;

function entryPoint() {
  if (command) {
    switch (command) {
      case "-send":
        if (args.length > 5) {
          console.log(
            styles.error(
              "You've specified more than 5 arguments - did you quote your message correctly?"
            )
          );
          process.exit(1);
        }
        sendMsg(args[0], args[1], args[2], args[3], args[4]);
        break;
      case "-interactive":
        if (args.length > 3) {
          console.log(styles.error("You've specified more than 3 arguments."));
          process.exit(1);
        }
        interactive(args[0], args[1], args[2]);
        break;
      case "-kick":
        if (args.length > 5) {
          console.log(styles.error("You've specified more than 5 arguments."));
          process.exit(1);
        }
        kick(args[0], args[1], args[2], args[3], args[4]);
        break;
      case "-ban":
        if (args.length > 5) {
          console.log(styles.error("You've specified more than 5 arguments."));
          process.exit(1);
        }
        ban(args[0], args[1], args[2], args[3], args[4]);
        break;
      case "-rmfromgroup":
        if (args.length > 5) {
          console.log(styles.error("You've specified more than 5 arguments."));
          process.exit(1);
        }
        rmFromGroup(args[0], args[1], args[2], args[3], args[4]);
        break;
      case "-archive":
        if (args.length > 4) {
          console.log(styles.error("You've specified more than 4 arguments."));
          process.exit(1);
        }
        archive(args[0], args[1], args[2], args[3]);
        break;
      case "-fetch":
        if (args.length > 5) {
          console.log(styles.error("You've specified more than 5 arguments."));
          process.exit(1);
        }
        fetchMsgs(args[0], args[1], args[2], args[3], args[4]);
        break;
      case "-help":
        // send help message
        help(args[0] === "--debug");
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
}

entryPoint();
