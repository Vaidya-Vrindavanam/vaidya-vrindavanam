export const PHONE_PRIMARY = '+91 90748 48705'
export const PHONE_PRIMARY_RAW = '919074848705'
export const PHONE_SECONDARY = '+91 82818 61587'
export const PHONE_SECONDARY_RAW = '918281861587'
export const EMAIL = 'ayurvv@gmail.com'

export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONE_PRIMARY_RAW}?text=${encodeURIComponent(message)}`
}

export const WA_DEFAULT = whatsappLink('Hi, I\'d like to book an appointment at Vaidya Vrindavanam')
