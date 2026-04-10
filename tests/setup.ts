import '@testing-library/jest-dom'
import type { ReactNode } from 'react'
import { createElement } from 'react'
import { vi } from 'vitest'

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    asPath: '/',
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
    },
  }),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) =>
    createElement('a', { href, ...props }, children),
}))
