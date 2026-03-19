import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const SCRIPT_ID = "google-identity-services";
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    let script = document.getElementById(SCRIPT_ID);

    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.id = SCRIPT_ID;
      document.head.appendChild(script);
    }

    const handleLoad = () => resolve();
    const handleError = () => reject(new Error("Failed to load Google sign-in script"));

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
  });
};

const GoogleAuthButton = ({ onSuccessPath }) => {
  const { loginWithGoogle } = useAuth();
  const [container, setContainer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    let cancelled = false;

    const setupGoogle = async () => {
      if (!clientId) {
        setErrorMessage("Google sign-in is not configured in frontend/.env");
        return;
      }

      if (!container) {
        return;
      }

      try {
        setErrorMessage("");
        await loadGoogleScript();

        if (cancelled || !window.google?.accounts?.id) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              await loginWithGoogle(response.credential);
              toast.success("Signed in with Google");
              window.location.assign(onSuccessPath || "/predict");
            } catch (error) {
              toast.error(error.response?.data?.message || "Google sign-in failed");
            }
          }
        });

        container.innerHTML = "";
        window.google.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          shape: "pill",
          width: 320,
          text: "continue_with"
        });

        setIsReady(true);
      } catch (error) {
        setErrorMessage(error.message || "Unable to load Google sign-in");
        toast.error(error.message || "Unable to load Google sign-in");
      }
    };

    setupGoogle();

    return () => {
      cancelled = true;
    };
  }, [clientId, container, loginWithGoogle, onSuccessPath]);

  if (errorMessage) {
    return <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{errorMessage}</div>;
  }

  if (!clientId) {
    return null;
  }

  return (
    <div className="space-y-3">
      {!isReady ? <LoadingSpinner label="Loading Google sign-in..." compact /> : null}
      <div ref={setContainer} className="flex justify-center" />
    </div>
  );
};

export default GoogleAuthButton;
