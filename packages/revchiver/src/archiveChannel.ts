import type { Client, /* Member, */ Message } from "revolt.js";

export async function archiveChannel(
  client: Client,
  msg: Message,
  ignoredMsgs?: Message[]
) {
  const sleep = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));

  const config = client.configuration ?? (await client.api.get("/"));
  const autumnURL = config.features.autumn.url;

  const archiveData = {
    server_id: "",
    server_name: "",
    channel_id: "",
    channel_name: "",
    archiver: "",
    archived_at: 0,
    messages: [{}],
  };

  // check if the script is being run by rexbot
  const isRexBot = client.user?.id! === "01FEEXZT74QWW1HSQH8B8BH1S1";

  // gather info
  const isServer = msg.channel?.server;
  archiveData.server_id = isServer ? msg.channel.serverId : "notAServer";
  archiveData.server_name = isServer ? msg.channel.server.name : "notAServer";
  archiveData.channel_id = msg.channelId!;
  archiveData.channel_name = msg.channel?.name!;
  archiveData.archiver = isRexBot ? msg.authorId! : client.user?.id!; // if the script is being run by rexbot, use the id of the author of the message; else, use the client's id
  archiveData.archived_at = new Date().getTime();

  // fetch/push messages
  function pushMsg(m: Message) {
    // users?: Member[]
    // let sender;
    // for (const u of users!) {
    //   if (m.author_id !== u.user?._id) continue;
    //   sender = u;
    // }

    let attachmentsObj: string[] = [];
    m.attachments?.forEach((a) => {
      attachmentsObj.push(`${autumnURL}/attachments/${a.id}/${a.filename}`);
    });

    type Reaction = {
      emoji: string;
      reactors: any;
    };

    let reactionsObj: Reaction[] = [];
    m.reactions.forEach((reactors, emoji) => {
      const obj = { emoji, reactors };
      reactionsObj.push(obj);
    });

    archiveData.messages.push({
      message_id: m.id,
      sender_id: m.authorId,
      sender_name:
        m.masquerade?.name ?? m.member?.nickname ?? m.author?.username, // order: masq > nick > username
      sender_avatar: `${autumnURL}/avatars/${
        m.masquerade?.avatar ?? m.member?.avatar
          ? `${m.member?.avatar?.id}/${m.member?.avatar?.filename}`
          : `${m.author?.avatar?.id}/${m.author?.avatar?.filename}`
      }`, // order: masq > server > global
      content: m.content ?? m.systemMessage,
      attachments: attachmentsObj,
      reactions: reactionsObj,
    });
  }
  let continueFetching = true;
  let fetchbefore = msg.id;
  while (continueFetching) {
    const msgs = await msg.channel?.fetchMessages({
      limit: 100,
      before: fetchbefore,
    });
    if (!msgs) return "nothingToArchive?";

    if (fetchbefore === msg.id) {
      const extraMsg = await msg.channel?.fetchMessage(msg.id);
      pushMsg(extraMsg!);
    }

    if (msgs.length < 100) {
      continueFetching = false;
    } else {
      fetchbefore = msgs[99].id;
    }

    msgs.forEach((m) => {
      if (!ignoredMsgs || !ignoredMsgs.includes(m)) {
        pushMsg(m);
      }
    });

    // wait 5 seconds to prevent ratelimiting
    await sleep(5000);
  }

  return archiveData;
}
