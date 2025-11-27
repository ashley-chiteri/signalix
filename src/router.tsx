// frontend/src/router.tsx - SIMPLIFIED MVP
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/browser/onboarding/LandingPage';
import ProtectedRoute from '@/components/ProtectedRoute'; // New import
import DashboardPage from '@/pages/TMA/DashboardPage'; 

// Placeholder for the main browser landing page
const TelegramWarning = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-200 px-4">
    <h1 className="text-xl font-semibold tracking-tight">
      Open in Telegram
    </h1>

    <p className="mt-2 text-sm text-indigo-400 text-center leading-relaxed">
      This experience is optimized for the Telegram Mini App.
      <br />Please launch it from inside Telegram.
    </p>
  </div>
);

// Placeholder for the restricted page after redirect
const NotSubscribedPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-200 px-4">
    <div className="text-red-400 text-2xl font-bold">🚫</div>

    <h1 className="text-lg font-semibold mt-3">
      Subscription Required
    </h1>

    <p className="mt-2 text-sm text-gray-400 text-center leading-snug max-w-xs">
      Your plan doesn’t allow access to this feature.
      <br />Please upgrade to continue.
    </p>
  </div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the browser landing page or non-subscribed users */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/not-subscribed" element={<NotSubscribedPage />} />
        <Route path="/open-in-telegram" element={<TelegramWarning />} />

        {/* Protected route for the TMA landing page */}
        <Route 
          path="/tma" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Other future protected routes can go here */}
        {/* <Route path="/paper-trading" element={<ProtectedRoute><PaperTradingPage /></ProtectedRoute>} /> */}
        {/* <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
      </Routes>
    </BrowserRouter>
  );
}