# Termivolt

A simple utility to interact with the Revolt API via the command line.

## Installation

You can install Termivolt via the following methods:

### npm

`npm i -g termivolt`

### Yarn

`yarn global add termivolt`

Yarn 2+ [doesn't support global installs](https://github.com/yarnpkg/berry/issues/821), but you can run Termivolt as a "one-time" command with `yarn dlx`:

`yarn dlx termivolt <command, eg -help>`

(Note that you'll have to append `yarn dlx` every time you want to use Termivolt with this method.)

### pnpm

`pnpm add termivolt --global`

## Usage

Required arguments are in \<angle brackets>, while optional arguments are in [square brackets].

### Sending messages (-send)

To send messages with Termivolt, run `termivolt -send`. Here's the full list of arguments:

`termivolt -send <(--user/--bot)> <channel id (in quotes)> <message content (in quotes)>`

#### Arguments

- `--user/--bot` determines whether the token is a bot or session token. These require different methods of authenticating. Session tokens are currently broken - a fix will be released in the future.
- The token is provided as-is (ie as copied from Revolt). Bot tokens can be found in your bot settings page - to get session tokens, [follow this guide](https://infi.sh/post/revolt-tokens).
- The channel ID should be provided as a string (ie in quotes). You can find it in the URL when using Revite (the official Revolt client) or by right-clicking the channel's entry on the channel list and selecting "Copy channel ID".
- The message itself should be fully encased in double quotes - if you want to use double quotes in the message itself, escape them with a backslash. Note that message formatting may be messed up in some cases - I'm still investigating as to why, but it seems backticks and \newlines break.

### Help (-help)

If you need help, or want to see a list of commands, run `termivolt -help`. This will also show you what version of Termivolt you're using, which is useful for bug reports and such.