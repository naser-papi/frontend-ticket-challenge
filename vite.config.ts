import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";
import react from "@vitejs/plugin-react";

//@ts-ignore
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
      nycrcPath: "./.nycrc.json",
      forceBuildInstrument: true //Instrument the source code for cypress runs
    })
  ],
  build: {
    outDir: "build",
    sourcemap: true,
    rollupOptions: {
      cache: false,
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        sourcemap: false,
        format: "iife",
        amd: true
      },
      preserveEntrySignatures: true
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup-tests.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["json", "lcov", "json-summary"],
      reportsDirectory: "./unit-coverage"
    }
  }
});
