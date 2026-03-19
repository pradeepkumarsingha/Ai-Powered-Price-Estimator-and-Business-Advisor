import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

if (typeof window !== "undefined" && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
  const scriptId = "google-identity-services";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = scriptId;
    document.head.appendChild(script);
  }
}

const hideStartupLoader = () => {
  const loader = document.getElementById("app-loader");
  if (!loader) {
    return;
  }

  loader.classList.add("app-loader-hidden");
  window.setTimeout(() => loader.remove(), 250);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0f172a",
              color: "#e2e8f0",
              border: "1px solid rgba(148, 163, 184, 0.2)"
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

window.requestAnimationFrame(() => {
  window.requestAnimationFrame(() => {
    hideStartupLoader();
  });
});
