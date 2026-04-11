import { useEffect, useRef } from 'react'
import { useSoundStore } from '../stores/soundStore'

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export const useClickSound = () => {
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!isSoundEnabled) {
      return
    }

    const playClick = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }

      const ctx = audioCtxRef.current

      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const bufferSize = ctx.sampleRate * 0.02
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 5000

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.6, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.015)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start(ctx.currentTime)
    }

    document.addEventListener('mousedown', playClick)

    return () => {
      document.removeEventListener('mousedown', playClick)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
        audioCtxRef.current = null
      }
    }
  }, [isSoundEnabled])
}
