const BASE_URL_LOCAL = `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api`
const BASE_URL_PROD = `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api`

export const BASE_URL = process.env.NODE_ENV === 'development' ? BASE_URL_LOCAL : BASE_URL_PROD