import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const DEFAULT_FALLBACK_THUMBNAIL =
  'https://resource-collab.vercel.app/assets/img/thumbnail.svg'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ACCESS_LEVEL_ICONS = {
  public: 'pi pi-globe',
  private: 'pi pi-lock',
  shared: 'pi pi-users',
}
