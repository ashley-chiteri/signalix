//src/pages/TMA/Overview.tsx
import { useEffect, useState } from "react";
import {  Loader2 } from "lucide-react";

export default function Overview() {
     const [Loading, setLoading] = useState(true);
      const ACCENT_COLOR = "#A087FF";
      // Simulate short loading before showing the auth UI
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (Loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-950"
      >
        <Loader2 
        className="animate-spin text-gray-300 dark:text-gray-200" 
        style={{color : ACCENT_COLOR}}
        size={40} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white"
    >Telegram mini app</div>
  )
}