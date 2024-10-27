import React from "react";
import { createRoot } from "react-dom/client"; // Update the import here
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
