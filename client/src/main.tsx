import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/i18n";

createRoot(document.getElementById("root")!).render(<App />);

// Signal that React has mounted - hide and remove critical loader
requestAnimationFrame(() => {
  const loader = document.getElementById('critical-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
});
