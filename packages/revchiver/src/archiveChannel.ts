import type { /* Member, */ Message } from "revolt.js";

export async function archiveChannel(msg: Message, ignoredMsgs?: Message[]) {
  const sleep = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));

  const autumnURL = msg.client.configuration?.features.autumn.url;

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
  const isRexBot = msg.client.user?._id! === "01FEEXZT74QWW1HSQH8B8BH1S1";

  // gather info
  const isServer = msg.channel?.server;
  archiveData.server_id = isServer ? msg.channel.server._id : "notAServer";
  archiveData.server_name = isServer ? msg.channel.server.name : "notAServer";
  archiveData.channel_id = msg.channel_id!;
  archiveData.channel_name = msg.channel?.name!;
  archiveData.archiver = isRexBot ? msg.author?._id! : msg.client.user?._id!; // if the script is being run by rexbot, use the id of the author of the message; else, use the client's id
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
      attachmentsObj.push(`${autumnURL}/attachments/${a._id}/${a.filename}`);
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
      message_id: m._id,
      sender_id: m.author_id,
      sender_name:
        m.masquerade?.name ?? m.member?.nickname ?? m.author?.username, // order: masq > nick > username
      sender_avatar: `${autumnURL}/avatars/${
        m.masquerade?.avatar ?? m.member?.avatar
          ? `${m.member?.avatar?._id}/${m.member?.avatar?.filename}`
          : `${m.author?.avatar?._id}/${m.author?.avatar?.filename}`
      }`, // order: masq > server > global
      content: m.content ?? m.system,
      attachments: attachmentsObj,
      reactions: reactionsObj,
    });
  }
  let continueFetching = true;
  let fetchbefore = msg._id;
  while (continueFetching) {
    const msgs = await msg.channel?.fetchMessages({
      limit: 100,
      before: fetchbefore,
    });
    if (!msgs) return "nothingToArchive?";

    if (fetchbefore === msg._id) {
      const extraMsg = await msg.channel?.fetchMessage(msg._id);
      pushMsg(extraMsg!);
    }

    if (msgs.length < 100) {
      continueFetching = false;
    } else {
      fetchbefore = msgs[99]._id;
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
