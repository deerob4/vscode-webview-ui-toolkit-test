import * as path from "path";
import Mocha, { MochaOptions } from "mocha";
import globby from "globby";

import "global-jsdom/register";

const root = path.resolve(__dirname, "..", "..");

export async function run(): Promise<void> {
  const options: MochaOptions = {
    ui: "bdd",
    color: true,
  };

  // Create the mocha test
  const mocha = new Mocha(options);

  const files = await globby("src/**/**.test.js", {
    cwd: root,
    absolute: true,
  });

  // Add files to the test suite
  files.forEach((f) => mocha.addFile(f));

  // Run the mocha test
  const failures = await new Promise<number>((resolve) => mocha.run(resolve));

  if (failures > 0) {
    throw new Error(`${failures} tests failed.`);
  }
}
