import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/__tests__/**/*.test.ts", "core/**/__tests__/**/*.test.ts", "plugins/**/__tests__/**/*.test.ts"],
  },
});