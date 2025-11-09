//src/router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/browser/onboarding/LandingPage';
import PricingPage from './pages/browser/onboarding/PricingPage';
import GetStartedPage from './pages/browser/onboarding/GetStarted';
import AuthPage from './pages/browser/onboarding/AuthPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
