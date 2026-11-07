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
}

export default config
