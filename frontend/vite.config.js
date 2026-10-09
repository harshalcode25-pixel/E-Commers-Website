import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        // Replaces CRA's "proxy" field in package.json — forwards any
        // /api/* request from the Vite dev server to the Express backend.
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: "build" // keep the same output folder the backend already expects
    }
});
