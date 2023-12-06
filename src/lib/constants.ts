const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_BASE_URL_LOCAL
const BASE_URL_PROD = process.env.NEXT_PUBLIC_BASE_URL_PROD

export const BASE_URL = process.env.NODE_ENV === 'development' ? BASE_URL_LOCAL : BASE_URL_PROD
export const API_URL = `${BASE_URL}/api`