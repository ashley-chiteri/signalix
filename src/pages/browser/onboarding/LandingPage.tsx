//frontend/src/pages/browser/onboarding/LandingPage.tsx
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const ACCENT_COLOR = "#A087FF";

  // Scroll handling for navbar
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 30));
  }, [scrollY]);

  const navOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  const navScale = useTransform(scrollY, [0, 200], [1, 0.98]);

  // PlanCard component
  interface PlanCardProps {
    title: string;
    price: number;
    standardPrice: number | null;
    description: string;
    savings: string | null;
    isRecommended?: boolean;
    features: string[];
  }

  const PlanCard: React.FC<PlanCardProps> = ({
    title,
    price,
    standardPrice,
    description,
    savings,
    isRecommended,
    features,
  }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl shadow-2xl flex flex-col transition-all duration-300 border ${
        isRecommended
          ? "border-4 transform scale-[1.02] bg-gray-800"
          : "border-gray-700 bg-gray-900 hover:shadow-xl"
      }`}
      style={{ borderColor: isRecommended ? ACCENT_COLOR : undefined }}
    >
      <div className="flex flex-row gap-2">
        <h3 className="text-2xl font-bold text-gray-100 mb-2">{title}</h3>
        {isRecommended && (
          <div
            className="text-xs font-bold text-gray-900 rounded-full px-3 py-1 self-start mb-2"
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            BEST VALUE
          </div>
        )}
      </div>

      {standardPrice && (
        <p className="text-sm font-medium text-gray-500 line-through">
          ${standardPrice}
        </p>
      )}

      <p
        className="text-5xl font-extrabold my-4"
        style={{ color: ACCENT_COLOR }}
      >
        ${price}
      </p>

      {savings && (
        <p className="text-green-400 text-sm font-semibold mb-3">{savings}</p>
      )}

      <p className="text-gray-400 mb-6">{description}</p>

      <ul className="text-gray-300 mb-6 space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span style={{ color: ACCENT_COLOR }}>✔</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/get-started")}
        className="mt-auto px-5 py-2 rounded-lg font-semibold shadow-lg hover:opacity-80 transition-all"
        style={{
          backgroundColor: ACCENT_COLOR,
          color: "#000",
        }}
      >
        Get Started
      </button>
    </motion.div>
  );

  // Plan logic
  const getPrices = (plan: "monthly" | "yearly" | "lifetime") => {
    const standard = { monthly: 20, yearly: 200, lifetime: 500 };
    return standard[plan];
  };

  const getSavingsMessage = (plan: "monthly" | "yearly" | "lifetime") => {
    if (plan === "yearly") return "Save 17% vs monthly";
    if (plan === "lifetime") return "Save 60% long-term";
    return null;
  };

  return (
    <main className="bg-gray-950 text-white font-sans relative">
      {/* 🧭 Navbar */}
      <motion.nav
        style={{
          opacity: navOpacity,
          scale: navScale,
          backgroundColor: isScrolled ? "rgba(17,17,17,0.8)" : "transparent",
          backdropFilter: isScrolled ? "blur(8px)" : "none",
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled ? "border-gray-800 shadow-lg" : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div
            className="text-2xl font-extrabold cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <span style={{ color: ACCENT_COLOR }}>Signalix</span>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => navigate("/get-started")}
              className="px-5 py-2 rounded-lg font-semibold hover:opacity-80 transition-all"
              style={{ backgroundColor: ACCENT_COLOR, color: "#000" }}
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="px-5 py-2 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen((p) => !p)} aria-label="Menu">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 border-t border-gray-800 flex flex-col items-center space-y-4 py-6 shadow-lg"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/get-started");
                }}
                className="w-5/6 px-5 py-3 rounded-lg font-semibold"
                style={{ backgroundColor: ACCENT_COLOR, color: "#000" }}
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/auth");
                }}
                className="w-5/6 px-5 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700"
              >
                Sign In
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          Welcome to <span style={{ color: ACCENT_COLOR }}>Signalix</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl"
        >
          AI-powered trading news & tools. Smarter insights, faster actions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate("/get-started")}
            className="px-6 py-3 text-black rounded-xl shadow-lg font-semibold"
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="px-6 py-3 bg-gray-700 rounded-xl hover:bg-gray-800 font-semibold"
          >
            Sign In
          </button>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Signalix?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-gray-300">
          {[
            {
              title: "Real-Time Signals",
              desc: "AI analyzes markets 24/7 and alerts you instantly.",
            },
            {
              title: "Accurate Insights",
              desc: "Powered by data-driven forecasting for traders.",
            },
            {
              title: "Seamless Experience",
              desc: "Accessible across desktop and mobile devices.",
            },
            {
              title: "Seamless Experience",
              desc: "Accessible across desktop and mobile devices.",
            },
            {
              title: "Seamless Experience",
              desc: "Accessible across desktop and mobile devices.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-800 rounded-xl shadow-lg"
            >
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: ACCENT_COLOR }}
              >
                {f.title}
              </h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="flex flex-col items-center py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Our Pricing</h2>
        <p className="text-xl text-center text-gray-400 mb-8">
          Choose a plan to get started with Signalix.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          <PlanCard
            title="Monthly"
            price={getPrices("monthly")}
            standardPrice={null}
            description="Perfect for testing and short-term trading."
            savings={getSavingsMessage("monthly")}
            features={[
              "Access to all AI trading tools",
              "Email & Telegram alerts",
              "Basic analytics dashboard",
            ]}
          />
          <PlanCard
            title="Yearly"
            price={getPrices("yearly")}
            standardPrice={240}
            description="Best Value! Stay ahead all year long."
            savings={getSavingsMessage("yearly")}
            isRecommended={true}
            features={[
              "Everything in Monthly",
              "Priority support",
              "Early access to new tools",
            ]}
          />
          <PlanCard
            title="Lifetime"
            price={getPrices("lifetime")}
            standardPrice={1200}
            description="One-time payment. All features forever."
            savings={getSavingsMessage("lifetime")}
            features={[
              "Lifetime updates",
              "Exclusive trading insights",
              "VIP support channel",
            ]}
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-8">What Traders Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Alex W.",
              text: "Signalix boosted my decision speed — I’m catching trends faster than ever.",
            },
            {
              name: "Jamal T.",
              text: "Accurate, clean, and simple. Definitely worth the yearly plan.",
            },
            {
              name: "Sophia L.",
              text: "Lifetime plan was the best investment in my trading career.",
            },
            
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-800 rounded-xl shadow-lg"
            >
              <p className="text-gray-300 mb-4 italic">“{t.text}”</p>
              <p className="font-semibold" style={{ color: ACCENT_COLOR }}>
                {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Signalix. All rights reserved.
      </footer>
    </main>
  );
}
