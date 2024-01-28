//export const SERVER_BASE_URL = 'http://localhost:3000'
// export const SERVER_BASE_URL = '/'

const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://127.0.0.1:3000' : 'https://new.icesspool.net'
export const LOGIN_URL = dev ? "/auth/login" : "https://new.icesspool.net/auth/login"

export const AWS_S3_URL = 'https://icesspool-files.s3.amazonaws.com/uploads/'

