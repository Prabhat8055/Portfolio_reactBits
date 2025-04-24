import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 🔥 Remove static preloader before mounting React
const staticLoader = document.getElementById("preloader");
if (staticLoader) {
  staticLoader.remove();
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
