// React
import React from "react";
import ReactDOM from "react-dom/client";

// Context
import { ThemeContextProvider } from "./context/ThemeContext.tsx";

// Components
import App from "./App.tsx";

// CSS
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
