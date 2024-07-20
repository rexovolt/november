# v0.5.0 (2022-03-12)

- **BREAKING**: This is the first version of Termivolt to support Revolt v0.5.3+ - it will **not work** with older versions of Revolt.
- Added support for archiving channels (`-archive`), fetching messages (`-fetch`) and removing members from groups (`-rmfromgroup`).
- Various other minor improvements.

# v0.4.1 (2022-03-12)

- **BREAKING**: v0.4.1 requires Node 16.14.0 or higher. If you're using Node 12/14/older versions of Node 16, please use 0.3.4 instead.
- Fixed a few more issues - the library should now be useable again. Apologies for the prior issues!

# v0.3.4 (2022-03-12)

This release fixes a few more issues - the library should now be useable again. Apologies for the prior issues!

Please note that **this will be the last version to support Node 12, 14 and versions of Node 16 before 16.14.0**. This release also **does not work** on Node 16.14.0+. Please use 0.4.1 instead.

# v0.3.3 (2022-03-12)

This release fixed a bug where the package could not be installed. _This release does not work._

# v0.3.2 (2022-03-12)

This release attempted to fix a bug where the package could not be installed. _This release does not work._

# v0.3.1 (2022-02-10)

This release is equal to v0.3.0.

# v0.3.0 (2022-02-10)

- **BREAKING**: The library has been rewritten in TypeScript - this means that the project is run from the `dist` folder, meaning that you might need to reinstall Termivolt.
- Add support for banning users (-ban)
- Add support for optionally setting a custom API URL (specify this as the last argument)
- General fixes and improvements to enhance the user experie- (but in all seriousness, some strings have been improved/standardised and such)

# v0.2.0 (2021-12-01)

- Add support for kicking users (-kick)
- General fixes and improvements (less sub-dependencies :tada:)

# v0.1.0 (2021-11-29)

- Initial release
- This version mostly supports message sending (with a few bugs)
