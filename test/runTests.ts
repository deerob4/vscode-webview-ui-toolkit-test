import * as path from "path";
import * as os from "os";
import { runTests, downloadAndUnzipVSCode } from "@vscode/test-electron";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");
    const extensionTestsPath = path.resolve(__dirname, "./suite");

    const vscodeExecutablePath = await downloadAndUnzipVSCode("stable");

    await runTests({
      vscodeExecutablePath,
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--user-data-dir", os.tmpdir()],
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
