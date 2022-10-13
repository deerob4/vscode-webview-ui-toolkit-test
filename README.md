Bare-bones VS Code extension to demonstrate issues with running the `@vscode/webview-ui-toolkit` library in a test environment.

To get started:

1. Run `npm install`
2. Run `npm run test`

Observe that an error like the following gets thrown:

```
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
^^^^^^

SyntaxError: Cannot use import statement outside a module
```
