import type { FeatureIconKey } from '@/features/landing/domain/landing-content'

const iconMap: Record<FeatureIconKey, JSX.Element> = {
  rsvp: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 9.5C17.5 14 10 18.5 10 18.5C10 18.5 2.5 14 2.5 9.5C2.5 5.91 5.41 3 9 3H11C14.59 3 17.5 5.91 17.5 9.5Z" />
      <path d="M7 9L9 11L13 7" />
    </svg>
  ),
  notifications: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 4.5H17.5V15.5C17.5 16.05 17.05 16.5 16.5 16.5H3.5C2.95 16.5 2.5 16.05 2.5 15.5V4.5Z" />
      <path d="M2.5 4.5L10 10.5L17.5 4.5" />
      <circle cx="15" cy="13" r="3" fill="var(--green)" stroke="none" />
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="3.5" width="15" height="14" rx="1" />
      <path d="M2.5 7.5H17.5" />
      <path d="M6.5 3.5V1.5" />
      <path d="M13.5 3.5V1.5" />
      <path d="M6 11H7" />
      <path d="M9.5 11H10.5" />
      <path d="M13 11H14" />
      <path d="M6 14H7" />
      <path d="M9.5 14H10.5" />
    </svg>
  ),
  configuration: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="5" cy="10" r="1.5" />
      <circle cx="5" cy="14" r="1.5" />
      <path d="M8.5 6H17" />
      <path d="M8.5 10H14" />
      <path d="M8.5 14H15.5" />
    </svg>
  ),
  privacy: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2L3.5 6V10C3.5 14.13 6.26 17.98 10 19C13.74 17.98 16.5 14.13 16.5 10V6L10 2Z" />
      <path d="M7 10L9 12L13 8" />
    </svg>
  ),
  teams: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="3.5" />
      <circle cx="13" cy="7" r="3.5" />
      <path d="M4 17C4 14.24 6.24 12 9 12H11C13.76 12 16 14.24 16 17" />
    </svg>
  ),
}

export function getFeatureIcon(icon: FeatureIconKey) {
  return iconMap[icon]
}