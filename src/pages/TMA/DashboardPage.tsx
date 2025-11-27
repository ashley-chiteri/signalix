// frontend/src/pages/TMA/DashboardPage.tsx - SIMPLIFIED MVP
import { DollarSign, CheckCircle, XCircle } from "lucide-react";
// Assuming you have shadcn/ui configured for these components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"; 
import { useAuth } from "@/context/AuthContext"; // New context import

export default function DashboardPage() {
    const { user, isAuthenticated } = useAuth();
    
    // Fallback/Placeholder for colors since we removed TMA SDK
    const ACCENT_COLOR = "#A087FF"; 
    const MAIN_BG = '#111827';
    const TEXT_COLOR = '#F3F4F6';

    // The ProtectedRoute ensures 'user' is available here after loading
    if (!user) {
      // This should ideally not happen if ProtectedRoute is working
      return <div className="text-red-500">Error: User data not found.</div>;
    }

    const subscriptionStatus = isAuthenticated ? (
        <span className="text-green-400 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Active</span>
    ) : (
        <span className="text-red-400 flex items-center"><XCircle className="w-4 h-4 mr-1" /> Inactive</span>
    );
    
    return (
        // Applying simple dark theme styles directly
        <div className="p-4 space-y-4 min-h-screen" style={{ backgroundColor: MAIN_BG, color: TEXT_COLOR }}>
            <h1 className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>
                Welcome, {user.first_name || 'Trader'}!
            </h1>

            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Subscription Status</CardTitle>
                    <DollarSign className="w-4 h-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{user.plan?.toUpperCase() || 'FREE'}</div>
                    <p className="text-xs text-gray-400 mt-1">{subscriptionStatus}</p>
                    <p className="text-sm text-gray-300 mt-2">
                        Your Telegram ID: **{user.telegram_id}**
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}