// frontend/src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// NOTE: Use a proper way to inject this in a real project (e.g., VITE_API_BASE_URL)
const API_BASE_URL = "http://localhost:3000/api";
const api = axios.create({ baseURL: API_BASE_URL });

// --- New Helper Function ---
const getTelegramId = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  const tgId = params.get("tg_id");
  if (tgId) {
    // ID found in the URL (when opened from the bot)
    return tgId;
  }
  // Fallback for direct browser development/testing ONLY
  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname.endsWith(".ngrok.io") ||
    window.location.hostname.endsWith(".ngrok-free.app");
  const FALLBACK_ID_FOR_DEV = "8378944165"; // Your known test user ID

  if (isDevelopment && !tgId) {
    console.warn(
      `[AuthContext] No tg_id found in URL. Using fallback ID: ${FALLBACK_ID_FOR_DEV}`
    );
    return FALLBACK_ID_FOR_DEV;
  }

  return null;
};

interface UserProfile {
  telegram_id: string;
  first_name: string;
  plan: string;
  subscription_status: "active" | "inactive";
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean; // Simple check for active subscription
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const telegramId = getTelegramId();

    const fetchUserData = async () => {
      if (!telegramId) {
        setIsLoading(false);
        return;
      }
      try {
        // NOTE: Using a header for ID is often insecure, but maintained for simplicity
        //console.log("Fetching user data for Telegram ID:", api.defaults.headers.common['x-telegram-user-id']);
        api.defaults.headers.common["x-telegram-user-id"] = telegramId;

        // 1. Fetch user profile (includes subscription status)
        const profileResponse = await api.get(`/user/${telegramId}`);
        const userData: UserProfile = profileResponse.data;
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null); // Clear user on failure
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const isAuthenticated = user?.subscription_status === "active";

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
