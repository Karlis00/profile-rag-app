import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Why: The proxy forwards /api calls to the FastAPI backend during dev,
// so no CORS issues and the frontend never hard-codes the backend URL.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/chat": {
        target: 'http://gluetun:8080', // Changed from 'backend'
        changeOrigin: true,
      },
    },
  },
});
