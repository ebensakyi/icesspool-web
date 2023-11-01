//export const SERVER_BASE_URL = 'http://localhost:3000'
// export const SERVER_BASE_URL = '/'

const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://localhost:3000' : 'https://dashboard.esicapps.org'
export const LOGIN_URL = dev ? "/auth/login" : "https://dashboard.esicapps.org/auth/login"