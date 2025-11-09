import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   server: {
    host: true, // equivalent to 0.0.0.0 (important!)
    port: 5173, // or any other port you want
    allowedHosts: [
      // allow ngrok domains
      ".ngrok-free.app",
      ".ngrok.io",
    ],
  },
});
