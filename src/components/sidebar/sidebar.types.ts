import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface SidebarNavigationItem {
  id: string
  label: string
  icon: IconDefinition
  path: string
}
