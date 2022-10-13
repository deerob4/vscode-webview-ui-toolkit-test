import React from "react";
import ReactDOM from "react-dom/client";

import Counter from "./Counter";

function renderApplication() {
  const container = document.getElementById("container");
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<Counter />);
  }
}

renderApplication();
