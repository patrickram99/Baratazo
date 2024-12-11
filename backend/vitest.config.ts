import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Allows using global functions like `describe`, `it`, etc.
    environment: 'node', // Sets the environment to Node.js
    coverage: {
      reporter: ['text', 'html'], // Enables coverage reports in text and HTML format
      all: true, // Include all files for coverage
    },
  },
})
