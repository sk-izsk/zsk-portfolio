type Falsy = false | null | undefined

type StyleModule = Record<string, unknown>

type StyleKey<Styles extends StyleModule> = Extract<
  {
    [Key in keyof Styles]: Styles[Key] extends string ? Key : never
  }[keyof Styles],
  string
>

type StyleConditionMap<Styles extends StyleModule> = Partial<
  Record<StyleKey<Styles>, boolean | null | undefined>
>

type RawClassName = {
  readonly __type: 'raw-class-name'
  readonly value: string
}

type BoundClassValue<Styles extends StyleModule> =
  | Falsy
  | RawClassName
  | StyleKey<Styles>
  | StyleConditionMap<Styles>
  | readonly BoundClassValue<Styles>[]

type ClassValue = Falsy | string | readonly ClassValue[]

const isRawClassName = (value: unknown): value is RawClassName => {
  return typeof value === 'object' && value !== null && '__type' in value
}

const isStyleConditionMap = <Styles extends StyleModule>(
  value: BoundClassValue<Styles>,
): value is StyleConditionMap<Styles> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !isRawClassName(value)
}

const pushRawClassNames = (classNames: string[], value: ClassValue): void => {
  if (!value) {
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item) => pushRawClassNames(classNames, item))
    return
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    classNames.push(value)
  }
}

const pushBoundClassNames = <Styles extends StyleModule>(
  styles: Styles,
  classNames: string[],
  value: BoundClassValue<Styles>,
): void => {
  if (!value) {
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item) => pushBoundClassNames(styles, classNames, item))
    return
  }

  if (typeof value === 'string') {
    classNames.push(styles[value] as string)
    return
  }

  if (isRawClassName(value)) {
    pushRawClassNames(classNames, value.value)
    return
  }

  if (isStyleConditionMap(value)) {
    for (const [key, isEnabled] of Object.entries(value)) {
      if (isEnabled) {
        classNames.push(styles[key as StyleKey<Styles>] as string)
      }
    }
  }
}

/**
 * Explicit escape hatch for non-module class names.
 *
 * Use this for:
 * - global utility classes like `row` or `padd-15`
 * - forwarded `className` props
 * - classes from a different style module
 *
 * Example:
 * `cn('overlay', { overlayAnimateIn: open }, raw('my-global-class', className))`
 */
export const raw = (...values: ClassValue[]): RawClassName => {
  const classNames: string[] = []
  values.forEach((value) => pushRawClassNames(classNames, value))

  return {
    __type: 'raw-class-name',
    value: classNames.join(' '),
  }
}

/**
 * Lightweight class joiner for plain string classes when you are not binding
 * to a specific `*.css.ts` module.
 *
 * Example:
 * `cx('main-content', isSidebarOpen && 'sidebar-mobile-open')`
 */
export const cx = (...values: ClassValue[]): string => {
  return raw(...values).value
}

/**
 * Creates a typed class composer for one `vanilla-extract` style module.
 *
 * Pass exported style keys as strings, and conditional keys as an object.
 * Only string-valued exports from the provided module are allowed.
 *
 * Example:
 * `const cn = createCn(styles)`
 * `cn('overlay', { overlayAnimateIn: open, overlayAnimateOut: !open }, raw(className))`
 */
export const createCn = <Styles extends StyleModule>(styles: Styles) => {
  return (...values: BoundClassValue<Styles>[]): string => {
    const classNames: string[] = []
    values.forEach((value) => pushBoundClassNames(styles, classNames, value))
    return classNames.join(' ')
  }
}

export type { BoundClassValue, StyleKey, StyleModule }
