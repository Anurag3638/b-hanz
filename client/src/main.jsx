import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth.jsx";
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
