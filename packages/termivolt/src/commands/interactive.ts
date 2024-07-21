import { styles, login, renderMessages } from "../lib/constants/index.js";

import type { NameIDPair } from "../types/Interactive.js";

import inquirer from "inquirer";
import { Channel } from "revolt.js";

const interactive = async function (
  userType: string,
  token: string,
  apiURL: string = "https://api.revolt.chat/"
) {
  // if any args are missing, throw errors before doing anything
  if (!userType) {
    console.log(
      styles.error(
        "You need to specify whether the account is a user or a bot (--user/--bot), a token and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!token) {
    console.log(
      styles.error(
        "You need to specify a token and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }

  console.log(styles.info("[INFO] Initialising..."));

  // init inquirer
  const prompt = inquirer.createPromptModule();

  // log in
  const client = await login(token, apiURL, userType);
  console.log(styles.info("[INFO] Logged in."));

  client.on("ready", async () => {
    // wrap everything in a function to ensure variables are available
    console.log(styles.info("[INFO] Fetching servers/conversations..."));

    // get servers and channels
    const s = client.servers.toList();
    const c = client.channels.toList();

    // create arrrays
    let conversations = [] as NameIDPair[];
    let conversationNames = [] as string[];

    // filter through channels for DMs/groups
    for (const cnl of c) {
      if (cnl.type === "DirectMessage" || cnl.type === "Group") {
        // use group name > DM recipient username > recipient ID
        const cname =
          cnl.name ?? cnl.recipient?.username ?? `Unnamed channel (${cnl.id})`;
        conversations.push({ name: cname, id: cnl.id });
        conversationNames.push(cname);
      }
    }

    // and now for servers
    let servers = [] as NameIDPair[];
    let serverNames = [] as string[];

    for (const srv of s) {
      // use server name > server ID
      servers.push({ name: srv.name, id: srv.id });
      serverNames.push(srv.name);
    }

    async function runtime() {
      // open a channel, list the last 10 messages and prompt the user for another action
      async function openChannel(selectedConvo: any) {
        console.log(styles.info("[INFO] Opening conversation..."));
        for (const c of conversations) {
          if (c.name === selectedConvo.name) {
            console.log(styles.success("[INFO] Opened conversation."));
            const channel = client.channels.get(c.id);
            if (channel) {
              console.log(styles.header("Messages"));
              const output = await renderMessages(channel, false);
              console.log(output);
              channelOptions(channel);
            } else {
              console.log("something broke :flushed:");
            }
          }
        }
      }

      async function channelOptions(channel: Channel) {
        const canSend = channel.havePermission("SendMessage");
        prompt([
          {
            type: "input",
            name: "action",
            message: `Select an action (${
              canSend ? "<s>end message, " : ""
            }switch <c>hannel, <q>uit interactive session):`,
            validate: (value) => {
              const regexBase = `^[cq${canSend ? "s" : ""}]{1}$`;
              const regex = new RegExp(regexBase);

              const pass = regex.test(value);

              if (pass) {
                return true;
              }

              return `Please select a valid option (${
                canSend ? "<s>end message, " : ""
              }switch <c>hannel, <q>uit interactive session).`;
            },
          },
        ]).then(async (input) => {
          switch (input.action) {
            case "s":
              sendMessage(channel);
              break;
            case "q":
              console.log(
                styles.info("[INFO] Quitting interactive session...")
              );
              process.exit(0);
            case "c":
            default:
              selectConvo(conversationNames);
              break;
          }
        });
      }

      async function sendMessage(channel: Channel) {
        prompt([
          {
            type: "input",
            name: "message",
            message: "Enter your message:",
          },
        ]).then(async (input) => {
          // double-check that the user can send messages
          const canSend = channel.havePermission("SendMessage");
          if (!canSend) {
            console.log(
              styles.error("You cannot send messages in this channel.")
            );
          } else {
            try {
              await channel.sendMessage(input.message);
              console.log(styles.success("Your message has been sent!"));
            } catch (error) {
              console.log(styles.error("The message could not be sent!"));
            }
          }
          channelOptions(channel);
        });
      }

      async function selectConvo(conversationNames: string[]) {
        prompt([
          {
            type: "rawlist",
            name: "name",
            message: "Which conversation do you want to open?",
            choices: conversationNames,
          },
        ]).then(async (selectedConvo) => {
          openChannel(selectedConvo);
        });
      }
      selectConvo(conversationNames);
    }
    runtime();
  });
};

export { interactive };
