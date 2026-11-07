import { describe, expect, it } from 'vitest'
import { getLensMapUrl } from '@utils/glassLens'

const decode = (url: string) => decodeURIComponent(url.replace('data:image/svg+xml,', ''))

describe('getLensMapUrl', () => {
  it('matches the size of the glass it bends', () => {
    expect(decode(getLensMapUrl(700, 56))).toContain('width="700" height="56"')
  })

  it('leaves the rim free and the center neutral', () => {
    const map = decode(getLensMapUrl(700, 56))

    expect(map).toContain('x="14" y="14" width="672" height="28" rx="14" fill="#808000"')
  })

  it('never asks for a negative corner radius on a very short bar', () => {
    expect(decode(getLensMapUrl(100, 10))).toContain('rx="0"')
  })
})
