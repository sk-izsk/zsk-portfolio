import { describe, expect, it } from 'vitest'
import { createCn, cx, raw } from '@utils/cn'

const styles = {
  root: 'root_hash',
  active: 'active_hash',
  disabled: 'disabled_hash',
  variants: ['not-a-class'],
} as const

describe('cn utilities', () => {
  it('composes raw class names', () => {
    expect(cx('row', false, ['padd-15', undefined], 'active')).toBe('row padd-15 active')
  })

  it('composes typed style keys with condition maps', () => {
    const cn = createCn(styles)

    expect(cn('root', { active: true, disabled: false })).toBe('root_hash active_hash')
  })

  it('allows mixing typed style keys with raw class names', () => {
    const cn = createCn(styles)

    expect(cn('root', raw('row', ['padd-15']), { active: true })).toBe(
      'root_hash row padd-15 active_hash',
    )
  })
})
