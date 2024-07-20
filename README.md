# Termivolt

A simple utility to interact with the Revolt API via the command line.

## Installation

Termivolt requires Node v18 or later. You can install Termivolt via the following methods:

### npm

`npm i -g termivolt`

### Yarn

`yarn global add termivolt`

Yarn 2+ [doesn't support global installs](https://github.com/yarnpkg/berry/issues/821), but you can run Termivolt as a "one-time" command with `yarn dlx`:

`yarn dlx termivolt <command, eg -help>`

(Note that you'll have to append `yarn dlx` every time you want to use Termivolt with this method.)

### pnpm

`pnpm add termivolt --global`

## Development

Make sure you've got Node and Corepack set up.

Clone the repository, then open the project folder and run the following commands:

```bash
yarn install
yarn build
npm link
```

## Usage

Required arguments are in \<angle brackets>, while optional arguments are in [square brackets].

### Global arguments

Aside from the help command, the following arguments are required for all commands:

- `--user/--bot` determines whether the token is a bot or session token. These require different methods of authentication.
- The token is provided as-is (i.e. as copied from Revolt). Bot tokens can be found in your bot settings page - to get session tokens, [follow this guide](https://infi.sh/post/revolt-tokens).

In addition, you can optionally specify a custom API URL (e.g. `https://api.myrevoltinstan.ce`). This should be the last argument and in quotes. **This is not required if you're using the official Revolt instance (`https://revolt.chat`).**

### Interactive usage (-interactive)

Termivolt can be used interactively, allowing you to quickly view and send messages. To do so, run `termivolt -interactive`. Here's the full list of arguments:

`termivolt -interactive <(--user/--bot)> <token> [custom API URL]`

### Sending messages (-send)

To send messages with Termivolt, run `termivolt -send`. Here's the full list of arguments:

`termivolt -send <(--user/--bot)> <token> <channel id (in quotes)> <message content (in quotes)> [custom API URL]`

#### Arguments

In addition to the required arguments:

- The channel ID should be provided as a string (i.e. in quotes). You can find it in the URL when using Revite (the official Revolt client) or by right-clicking the channel's entry on the channel list and selecting "Copy channel ID".
- The message itself should be fully encased in double quotes - if you want to use double quotes in the message itself, escape them with a backslash. Note that message formatting may be messed up in some cases - I'm still investigating as to why, but it seems backticks and \newlines break.

### Use Termivolt as a TUI (-interactive)

To use Termivolt as an interactive client, run `termivolt -interactive`. Here's the full list of arguments:

`termivolt -interactive <(--user/--bot)> <token> [custom API URL]`

#### Arguments

Aside from the required arguments, this command does not take any extra arguments since, as the name suggests, it's designed for interactive use.

### Fetching messages (-fetch)

To fetch messages with Termivolt, run `termivolt -fetch`. Here's the full list of arguments:

`termivolt -send <(--user/--bot)> <token> <channel id (in quotes)> [amount of messages to send] [custom API URL]`

#### Arguments

In addition to the required arguments:

- The channel ID should be provided as a string (i.e. in quotes). You can find it in the URL when using Revite (the official Revolt client) or by right-clicking the channel's entry on the channel list and selecting "Copy channel ID".
- If specified, the amount should be provided as a standard number - the maximum amount of messages you can fetch is 100, and the default is 10.

### Archiving messages (-archive)

To archive messages with Termivolt, run `termivolt -archive`. Here's the full list of arguments:

`termivolt -archive <(--user/--bot)> <token> <channel id (in quotes)> [custom API URL]`

#### Arguments

In addition to the required arguments:

- The channel ID should be provided as a string (i.e. in quotes). You can find it in the URL when using Revite (the official Revolt client) or by right-clicking the channel's entry on the channel list and selecting "Copy channel ID".

### Kicking users (-kick)

To kick members from servers with Termivolt, run `termivolt -kick`. Note that you'll need the `Kick Members` permission - if you get a 403 error, this might be why. Here's the full list of arguments:

`termivolt -kick <(--user/--bot)> <token> <server id (in quotes)> <user id (in quotes)> [custom API URL]`

#### Arguments

In addition to the required arguments:

- The server ID should be provided as a string (i.e. in quotes). You can find it in the URL when using Revite (the official Revolt client) or by right-clicking the server's entry on the server list and selecting "Copy server ID".
- The user ID should also be provided as a string.

### Banning users (-ban)

To ban members from servers with Termivolt, run `termivolt -ban`. Note that you'll need the `Ban Members` permission - if you get a 403 error, this might be why. Here's the full list of arguments:

`termivolt -ban <(--user/--bot)> <token> <server id (in quotes)> <user id (in quotes)> [custom API URL]`

#### Arguments

In addition to the required arguments:

- The server ID should be provided as a string (i.e. in quotes). You can find it in the URL when using Revite (the official Revolt client) or by right-clicking the server's entry on the server list and selecting "Copy server ID".
- The user ID should also be provided as a string.

### Removing users from a group DM (-rmfromgroup)

To remove users from a group DM with Termivolt, run `termivolt -rmfromgroup`. Note that you need to own the group - if you get a 403 error, this might be why. Here's the full list of arguments:

`termivolt -rmfromgroup <(--user/--bot)> <token> <group id (in quotes)> <user id (in quotes)> [custom API URL]`

#### Arguments

In addition to the required arguments:

- The group ID should be provided as a string (i.e. in quotes). You can find it in the URL when using Revite (the official Revolt client) or by right-clicking the groups's entry on the DM list and selecting "Copy server ID".
- The user ID should also be provided as a string.

### Help (-help)

If you need help, or want to see a list of commands, run `termivolt -help`. This will also show you what version of Termivolt you're using, which is useful for bug reports and such.

## Support

If you want to report a bug, suggest a feature or get help with using Termivolt, you can [open an issue](https://github.com/rexovolt/november/issues/new) or join [Termivolt's support server](https://rvlt.gg/ra9dr2Rd) on Revolt.
