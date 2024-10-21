import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getItem(
  label: string,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: string
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
