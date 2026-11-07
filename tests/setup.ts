import '@testing-library/jest-dom/vitest'

const createMemoryStorage = (): Storage => {
  const store = new Map<string, string>()

  return {
    get length() {
      return store.size
    },
    clear() {
      store.clear()
    },
    getItem(key) {
      return store.has(key) ? store.get(key)! : null
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null
    },
    removeItem(key) {
      store.delete(key)
    },
    setItem(key, value) {
      store.set(key, String(value))
    },
  }
}

const hasWorkingStorage = (value: unknown): value is Storage =>
  Boolean(
    value &&
    typeof value === 'object' &&
    'getItem' in value &&
    typeof value.getItem === 'function' &&
    'setItem' in value &&
    typeof value.setItem === 'function' &&
    'clear' in value &&
    typeof value.clear === 'function',
  )

const ensureStorage = (name: 'localStorage' | 'sessionStorage') => {
  const currentValue = window[name]

  if (hasWorkingStorage(currentValue)) {
    return
  }

  const storage = createMemoryStorage()

  Object.defineProperty(window, name, {
    value: storage,
    configurable: true,
  })

  Object.defineProperty(globalThis, name, {
    value: storage,
    configurable: true,
  })
}

ensureStorage('localStorage')
ensureStorage('sessionStorage')

// jsdom has neither API. Observers never fire and no media query matches, so scroll scenes stay off.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = []
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

globalThis.IntersectionObserver = IntersectionObserverStub

window.matchMedia = (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  }) as MediaQueryList

window.scrollTo = () => undefined

HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
  this.open = false
}
