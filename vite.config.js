import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        about: "about.html",
        "join-wait-list": "join-wait-list.html",
        // Add more pages here if needed
      },
    },
  },
});
