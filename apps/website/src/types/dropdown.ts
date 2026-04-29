import type { IconName } from "@/components/Icon.tsx";

export interface DropdownItem {
  label: string;
  icon?: IconName;
  kbd?: string;
  danger?: boolean;
  onClick?: () => void;
}

export type DropdownEntry = DropdownItem | { divider: true };
