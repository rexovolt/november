# Revchiver

Archiving library for Revolt.

## Requirements

Revchiver requires Node 18 or later and Revolt.JS v7.

## Usage

Basic example - **make sure to pass Revolt.JS messages to the function**:

```ts
import { archiveChannel } from "revchiver";

const client = "<insert revolt.js client object here>";
const msg = "<insert revolt.js message object here>";
const ignoredMsgs = ["array", "of", "message", "objects"];

const data = await archiveChannel(client, msg, ignoredMsgs);
```
