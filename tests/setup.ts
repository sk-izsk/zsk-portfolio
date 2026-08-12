import '@testing-library/jest-dom'

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
