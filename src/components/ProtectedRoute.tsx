// frontend/src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

// Basic Loading/Error/Access component for the MVP
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        // Simple loading screen
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <Loader2 className="animate-spin text-indigo-400" size={40} />
                <p className="mt-4">Checking Subscription...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to a specific page for non-subscribed users (e.g., an info/subscribe page)
        // NOTE: Redirecting to '/not-subscribed' for now, but you should create a dedicated page
        return <Navigate to="/not-subscribed" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;