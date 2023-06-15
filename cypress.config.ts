import { defineConfig } from "cypress";
import registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    }
  }
});
