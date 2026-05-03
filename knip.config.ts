import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['index.html'],
  project: [
    'src/**/*.{ts,tsx}',
    'tests/**/*.{ts,tsx}',
    '!src/**/*.css.ts',
    '!src/vite-env.d.ts',
  ],
  includeEntryExports: true,
  ignore: ['coverage/**', 'dist/**', 'graphify-out/**'],
}

export default config
