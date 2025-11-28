import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Get your ngrok URL from an environment variable (recommended) or hardcode it temporarily
// Example: NGROK_URL=https://1234abcd.ngrok.io
const NGROK_URL = process.env.VITE_NGROK_URL || 'https://76409cff2d01.ngrok-free.app';
const isNgrok = NGROK_URL.includes("ngrok");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   server: {
    host: '0.0.0.0',
    port: 5173, // or any other port you want
    allowedHosts: [
      // allow ngrok domains
      ".ngrok-free.app",
      ".ngrok.io",
    ],
    // --- TMA-SPECIFIC FIX ---
    hmr: isNgrok
      ? false // << DISABLE HMR COMPLETELY for Telegram loads
      : {
          protocol: "ws",
          host: "localhost",
          port: 5173,
        },
  },
});
