import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: ['src/**'],
      exclude: ['src/CanvasPoster.ts'],
      reporter: ['text'],
    },
  },
})
