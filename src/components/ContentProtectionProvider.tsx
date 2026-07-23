import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

const PROTECTED_SELECTOR = '[data-content-protected="true"]'
const IGNORE_SELECTOR = '[data-content-protection-ignore="true"]'
const EDITABLE_TAG_NAMES = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'])

const getElement = (node: EventTarget | Node | null) => {
  if (!node) {
    return null
  }

  if (node instanceof Element) {
    return node
  }

  if (node instanceof Node) {
    return node.parentElement
  }

  return null
}

const isEditableElement = (element: Element | null) => {
  if (!element || !(element instanceof HTMLElement)) {
    return false
  }

  return element.isContentEditable || EDITABLE_TAG_NAMES.has(element.tagName)
}

const isIgnoredElement = (element: Element | null) => {
  return Boolean(element?.closest(IGNORE_SELECTOR))
}

const isProtectedNode = (node: EventTarget | Node | null) => {
  const element = getElement(node)

  if (!element || isIgnoredElement(element) || isEditableElement(element)) {
    return false
  }

  return Boolean(element.closest(PROTECTED_SELECTOR))
}

const isProtectedSelection = () => {
  const selection = window.getSelection()

  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return false
  }

  return (
    isProtectedNode(selection.anchorNode) ||
    isProtectedNode(selection.focusNode) ||
    isProtectedNode(selection.getRangeAt(0).commonAncestorContainer)
  )
}

const shouldBlock = (eventTarget: EventTarget | null) => {
  return isProtectedNode(eventTarget) || isProtectedSelection()
}

const isDevtoolsShortcut = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase()
  const hasMetaOrCtrl = event.metaKey || event.ctrlKey
  const hasInspectorModifiers = hasMetaOrCtrl && event.shiftKey
  const hasMacInspectorModifiers = event.metaKey && event.altKey

  return (
    key === 'f12' ||
    key === 'u' && hasMetaOrCtrl ||
    key === 's' && hasMetaOrCtrl ||
    key === 'i' && hasInspectorModifiers ||
    key === 'i' && hasMacInspectorModifiers ||
    key === 'j' && hasInspectorModifiers ||
    key === 'j' && hasMacInspectorModifiers ||
    key === 'c' && hasInspectorModifiers ||
    key === 'c' && hasMacInspectorModifiers
  )
}

interface ContentProtectionProviderProps extends PropsWithChildren {
  enabled: boolean
}

export const ContentProtectionProvider = ({
  children,
  enabled,
}: ContentProtectionProviderProps) => {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const handleContextMenu = (event: MouseEvent) => {
      if (!shouldBlock(event.target)) {
        return
      }

      event.preventDefault()
    }

    const handleCopy = (event: ClipboardEvent) => {
      if (!shouldBlock(event.target)) {
        return
      }

      event.preventDefault()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      const isCopyShortcut = key === 'c' && (event.metaKey || event.ctrlKey)

      if (!shouldBlock(event.target)) {
        return
      }

      if (isCopyShortcut || isDevtoolsShortcut(event)) {
        event.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled])

  return children
}
