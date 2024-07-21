import { styles, login, fetchChannel } from "../lib/constants/index.js";

const rmFromGroup = async function (
  userType: string,
  token: string,
  group: string,
  member: string,
  apiURL: string = "https://api.revolt.chat/"
) {
  // if any args are missing, throw errors before doing anything
  if (!userType) {
    console.log(
      styles.error(
        "You need to specify whether the account is a user or a bot (--user/--bot), a token, the group's ID, the ID of the user to remove and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!token) {
    console.log(
      styles.error(
        "You need to specify a token, the group's ID, the ID of the user to remove and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!group) {
    console.log(
      styles.error(
        "You need to specify the group's ID, the ID of the user to remove and optionally a custom API URL (all in quotes)."
      )
    );
    return process.exit(1);
  }
  if (!member) {
    console.log(
      styles.error(
        "You need to specify the ID of the user to remove and optionally a custom API URL (both in quotes)."
      )
    );
    return process.exit(1);
  }

  // log in
  const client = await login(token, apiURL, userType);
  console.log(styles.info("[INFO] Logged in."));

  client.on("ready", async () => {
    const channel2 = await fetchChannel(client, group);
    if (channel2.type !== "Group") {
      console.log(
        styles.error(
          `That doesn't seem to be a group - have you used the right ID?`
        )
      );
      return process.exit(1);
    }
    console.log(styles.info("[INFO] The group has been found."));

    // send the message
    try {
      await channel2!.removeMember(member);
      console.log(styles.success("The user has been removed."));
    } catch (error) {
      console.log(
        styles.error(
          `There was an issue removing the member - do you own the group?\n\nThe error was: ${error}`
        )
      );
    }

    // for SOME reason we need to end the process manually - is something lingering?
    return process.exit(0);
  });
};

export { rmFromGroup };
