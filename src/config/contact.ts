export const PHONE_PRIMARY = '+91 90748 48705'
export const PHONE_PRIMARY_RAW = '919074848705'
export const PHONE_SECONDARY = '+91 82818 61587'
export const PHONE_SECONDARY_RAW = '918281861587'
export const EMAIL = 'ayurvv@gmail.com'

export const CLINIC_NAME = 'Vaidya Vrindavanam Ayurveda Hospital'
export const ADDRESS_STREET = 'Near RK Junction, NH-66'
export const ADDRESS_LOCALITY = 'Haripad'
export const ADDRESS_DISTRICT = 'Alappuzha'
export const ADDRESS_REGION = 'Kerala'
export const ADDRESS_POSTAL_CODE = '690513'
export const ADDRESS_COUNTRY = 'IN'
export const ADDRESS_COUNTRY_LABEL = 'India'
export const GEO_LATITUDE = 9.2711918
export const GEO_LONGITUDE = 76.4608952
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Vaidya+Vrindavanam+Ayurveda+Hospital+Haripad/@9.2711918,76.4608952,17z'

export const POSTAL_ADDRESS_SCHEMA = {
  '@type': 'PostalAddress',
  streetAddress: ADDRESS_STREET,
  addressLocality: ADDRESS_LOCALITY,
  addressRegion: ADDRESS_REGION,
  postalCode: ADDRESS_POSTAL_CODE,
  addressCountry: ADDRESS_COUNTRY,
}

export const GEO_SCHEMA = {
  '@type': 'GeoCoordinates',
  latitude: GEO_LATITUDE,
  longitude: GEO_LONGITUDE,
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONE_PRIMARY_RAW}?text=${encodeURIComponent(message)}`
}

export const WA_DEFAULT = whatsappLink('Hi, I\'d like to book an appointment at Vaidya Vrindavanam')
