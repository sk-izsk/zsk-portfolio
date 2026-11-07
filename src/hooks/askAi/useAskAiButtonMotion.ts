import { messages } from '@components/askAi/askAi.css'
import { useGenie } from '@hooks/useGenie'
import { canAnimate } from '@utils/motion'
import { useCallback, useState, type RefObject } from 'react'

const MESSAGES_SELECTOR = `.${messages}`
const POP_MS = 500

export const useAskAiButtonMotion = (
  panelRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
) => {
  // The button keeps its close shape until the chat has fully poured back into it.
  const [isCloseShape, setIsCloseShape] = useState(isOpen)

  const playPop = useCallback(() => {
    if (canAnimate()) {
      triggerRef.current?.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0.86)' },
          { transform: 'scale(1.1)' },
          { transform: 'scale(0.97)' },
          { transform: 'scale(1)' },
        ],
        { duration: POP_MS, easing: 'ease-out' },
      )
    }
  }, [triggerRef])

  const handleGenieSettled = useCallback(
    (nowOpen: boolean) => {
      setIsCloseShape(nowOpen)
      playPop()
    },
    [playPop],
  )

  useGenie(panelRef, triggerRef, isOpen, handleGenieSettled, MESSAGES_SELECTOR)

  return { isCloseShape, playPop }
}
