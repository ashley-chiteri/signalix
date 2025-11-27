// frontend/src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Define your backend base URL
// NOTE: Use a proper way to inject this in a real project (e.g., VITE_API_BASE_URL)
const API_BASE_URL = 'http://localhost:3000/api'; 
const api = axios.create({ baseURL: API_BASE_URL });

// Fallback ID for browser development (must correspond to a user in your DB)
const FALLBACK_TELEGRAM_ID = '8378944165'; 

interface UserProfile {
    telegram_id: string;
    first_name: string;
    plan: string;
    subscription_status: 'active' | 'inactive';
}

interface AuthContextType {
    user: UserProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean; // Simple check for active subscription
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const telegramId = FALLBACK_TELEGRAM_ID; // Simplified: hardcode for now

        const fetchUserData = async () => {
            if (!telegramId) {
                setIsLoading(false);
                return;
            }
            try {
                // NOTE: Using a header for ID is often insecure, but maintained for simplicity
                console.log("Fetching user data for Telegram ID:", api.defaults.headers.common['x-telegram-user-id']);
                api.defaults.headers.common['x-telegram-user-id'] = telegramId;

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

    const isAuthenticated = user?.subscription_status === 'active';

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};