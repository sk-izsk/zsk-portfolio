export type SidebarIconName =
  | "home"
  | "user"
  | "list"
  | "cogs"
  | "briefcase"
  | "comments"
  | "envelope"

export interface SidebarNavigationItem {
  id: string
  label: string
  icon: SidebarIconName
  path: string
}
