import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8880,
    proxy: {
      '/backend': {
        target: 'http://localhost:5000', // The address of your Node.js server
        changeOrigin: true, // Needed for virtual hosting/CORS
        secure: false, // Set to true if your backend uses HTTPS (it doesn't, currently)
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
}));
