import React, { useState } from "react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

function Counter(): JSX.Element {
  const [counter, setCounter] = useState(0);

  const inc = () => setCounter((c) => c + 1);
  const dec = () => setCounter((c) => c - 1);

  return (
    <div>
      <h1>The counter is currently {counter}</h1>

      <VSCodeButton appearance="primary" onClick={inc} title="Increment">
        Increment
      </VSCodeButton>
      <VSCodeButton appearance="primary" onClick={dec} title="Decrement">
        Decrement
      </VSCodeButton>
    </div>
  );
}

export default Counter;
