import picocolors from "picocolors";

export default {
  info: picocolors.blue,
  error: (text: string) => picocolors.bold(picocolors.red(text)),
  success: (text: string) => picocolors.bold(picocolors.green(text)),

  // -help styles
  title: (text: string) =>
    picocolors.bold(picocolors.underline(picocolors.blue(text))),
  header: (text: string) => picocolors.bold(picocolors.underline(text)),
};
