// frontend/src/pages/browser/onboarding/AuthPage.tsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    onTelegramAuth?: (userData: TelegramAuthData) => void;
  }
}

interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
  referral_code?: string; // Added to payload for clarity, though used in checkout
}

export default function AuthPage() {
    const navigate = useNavigate();
  const [isAuthPending, setIsAuthPending] = useState(false);
  const [isBotScriptLoaded, setIsBotScriptLoaded] = useState(false);
  const ACCENT_COLOR = "#A087FF";

    const handleTelegramAuth = useCallback((userData: TelegramAuthData) => {
        // Start authentication process
        // if an active subscription exists, redirect to dashboard
        // else, create account and redirect to checkout
      console.log("Authenticated user:", userData);
      toast.success('Telegram authentication successful!');
      // fix this later
      setIsAuthPending(true);
      navigate("/dashboard");
    }, []);

  useEffect(() => {
    window.onTelegramAuth = handleTelegramAuth;
  }, [handleTelegramAuth]);

  useEffect(() => {
    if (!isBotScriptLoaded && document.getElementById("telegram-login-button")) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", import.meta.env.VITE_BOT_USERNAME || "SignalixAIBOT");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.setAttribute("data-request-access", "write");
      script.async = true;
      script.onload = () => setIsBotScriptLoaded(true);

      document.getElementById("telegram-login-button")?.appendChild(script);
    }
  }, [isBotScriptLoaded]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-2xl shadow-xl text-center border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">
          Sign in with <span style={{ color: ACCENT_COLOR }}>Telegram</span>
        </h2>

        {isAuthPending ? (
          <div className="flex justify-center text-gray-500 py-10">
             <Loader2 className="w-6 h-6 animate-spin mr-3" />
             <p>Authenticating and redirecting...</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-gray-400">
              {/*email
                ? `Complete your registration by linking your Telegram account.`
                : `Sign in securely with your Telegram account.`*/}
                Sign in securely with your Telegram account.
            </p>
            <div className="mt-6 flex justify-center">
              <div id="telegram-login-button" className="flex items-center justify-center">
                {!isBotScriptLoaded && (
                  <div className="w-40 h-10 flex items-center justify-center rounded-lg border border-gray-600 bg-gray-700 text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
