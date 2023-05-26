import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ufronts/blazor": {
        // target: "http://127.0.0.1:8080",
        // rewrite: (path) => path.replace("/ufronts/blazor", "/publish/wwwroot"),
        target: "http://localhost:5021",
        rewrite: (path) => path.replace("/ufronts/blazor", ""),
      },
    },
  },
});
