import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        // Forward local development API requests to the deployed backend.
        proxy: {
            "/api": {
                target: "https://e-commers-website-1-micv.onrender.com",
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: "build" // keep the same output folder the backend already expects
    }
});
