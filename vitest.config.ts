import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}'],
      exclude: ['src/**/*.css.ts', 'src/main.tsx', 'src/routes/lazyScreens.ts'],
    },
  },
})
