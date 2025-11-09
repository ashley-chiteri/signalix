// frontend/src/pages/browser/onboarding/GetStarted.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { showToast } from "@/utils/toastUtils";

export default function GetStartedPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const ACCENT_COLOR = "#A087FF";

  const handleContinue = () => {
    if (!input.includes("@") || input.length < 5) {
      showToast("error", "Invalid email", "Please check and try again.");
      return;
    }
    navigate("/auth"); // move to Telegram login page
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl text-center border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          Enter your email
        </h2>
        <p className="text-gray-400 mb-6">
          We use your email to create your account and send updates.
        </p>

        {referralCode && (
          <div
            className="p-3 mb-4 rounded-lg bg-gray-900 border"
            style={{ borderColor: ACCENT_COLOR }}
          >
            <p className="text-sm font-medium text-gray-300">
              Signing up with referral code:{" "}
              <strong style={{ color: ACCENT_COLOR }}>{referralCode}</strong>
            </p>
          </div>
        )}

        <input
          type="email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="you@example.com"
          className="w-full p-3 border rounded-lg mb-6 bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500 focus:outline-none"
        />

        <button
          onClick={handleContinue}
          className="w-full py-3 text-gray-950 rounded-lg transition-colors hover:opacity-80 font-semibold cursor-pointer"
          style={{ backgroundColor: ACCENT_COLOR }}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
