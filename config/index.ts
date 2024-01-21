//export const SERVER_BASE_URL = 'http://localhost:3000'
// export const SERVER_BASE_URL = '/'

const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://localhost:3000' : 'https://app.icesspool.net'
export const LOGIN_URL = dev ? "/auth/login" : "https://app.icesspool.net/auth/login"

export const AWS_S3_URL = 'https://esicapps-exports.s3.eu-west-2.amazonaws.com/uploads/'