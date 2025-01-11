# v0.7.0 (2025-01-11)

- BREAKING: Revchiver now requires Node v18 or later and Revolt.JS v7.
- BREAKING: `archiveChannel()` now takes 3 parameters and requries a `Client` object as its first parameter.
- The package should now be smaller.

# v0.6.0 (2023-01-14)

- BREAKING: You must now import functions from the package itself - replace any imports from `revchiver/dist` with imports from `revchiver`.
- Reactions are now archived.
- Updated to Revolt.JS v6.0.19.

# v0.5.4 (2022-11-08)

- The timestamp/archiver ID should now always be correct.
- Fix build/typing issues.

# v0.5.3 (2022-05-31)

- The package should no longer get stuck in an infinite loop if there is only one message in a channel.

# v0.5.2 (2022-05-07)

- Optimise message fetcher.

# v0.5.1 (2022-05-07)

- Avoid ratelimiting.

# v0.5.0 (2022-05-07)

- BREAKING: `archiveChannel()`'s `botMsg` and `ignoreSuppliedMessages` params have been removed - the function now just takes a `Message` and, optionally, `ignoredMsgs` - an array of `Messages` to ignore.

# v0.4.0 (2022-05-07)

- BREAKING: Update to Revolt.JS v6.0.0.

# v0.3.1 (2022-05-06)

- Hotfix for v0.3.0.

# v0.3.0 (2022-05-06)

- BREAKING: The `client` param of `archiveChannel()` has been removed - it was unused.
- `archiveChannel()` now takes an optional `ignoreSuppliedMessages` param (a boolean, defaulting to `true`) - this determines whether to ignore the first message passed to the function (the second message, `botMsg`, will always be ignored.)

# v0.2.0 (2022-05-01)

- BREAKING: `archive()` has been renamed to `archiveChannel()`, and now returns an object instead of a string.

# v0.1.4 (2022-04-17)

- Fix types (#1) - thanks @sportshead!

# v0.1.3 (2022-04-17)

- Attempt to fix types.

# v0.1.2 (2022-04-17)

- Attempt to fix types.

# v0.1.1 (2022-04-17)

- Add types.

# v0.1.0 (2022-04-15)

Initial release.
