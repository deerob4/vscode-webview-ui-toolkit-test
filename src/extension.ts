import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("toolkitTest.openWebview", () => {
      const panel = vscode.window.createWebviewPanel(
        "testWebview",
        "Test Webview",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      const webviewRoot = vscode.Uri.file(path.join(__dirname, "webview"));

      const scriptUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(webviewRoot, "test.js")
      );

      panel.webview.html = getHtml(
        panel.webview.cspSource,
        scriptUri.toString()
      );
    })
  );
}

function getHtml(cspSrc: string, scriptSrc: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
            http-equiv="Content-Security-Policy"
            content="default-src 'none'; script-src ${cspSrc} 'unsafe-inline';"
        />
        <title>Counter</title>
    </head>
    <body>
        <div id="container"></div>
        <script src="${scriptSrc}"></script>
    </body>
  </html>
  `;
}
