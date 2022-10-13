const esbuild = require("esbuild");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const base = path.join(__dirname, "../");
const outputDir = "dist";

const y = yargs(hideBin(process.argv)).options({
  watch: {
    describe: "Watches extension files and rebuilds on change.",
    type: "boolean",
  },
  production: {
    describe: "Enables production optimisations.",
    type: "boolean",
  },
}).argv;

/** @type esbuild.BuildOptions */
const common = {
  bundle: true,
  platform: "node",
  minify: y.production,
  watch: false,
  incremental: y.watch,
  sourcemap: y.production ? undefined : "inline",
  define: {
    "process.env.NODE_ENV": y.production ? '"production"' : '"development"',
  },
  external: [],
  metafile: true,
};

function buildMainExtension() {
  console.log("Building main extension...");
  return esbuild.build({
    ...common,
    external: [...common.external, "vscode"],
    entryPoints: [path.join(base, "src", "extension.ts")],
    outfile: path.join(base, outputDir, "extension.js"),
  });
}

function buildWebview() {
  console.log("Building webview...");
  const webviewBase = path.join(base, "src", "webview");

  return esbuild.build({
    ...common,
    platform: "browser",
    entryPoints: {
      test: path.join(webviewBase, "index.tsx"),
    },
    outdir: path.join(base, outputDir, "webview"),
  });
}

async function build() {
  if (y.production) {
    console.log("Packaging for production.");
  }
  if (y.watch) {
    console.log("[watch] build started");
  }
  await buildMainExtension();
  await buildWebview();
  console.log("Done.");
}

build();
