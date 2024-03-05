//export const SERVER_BASE_URL = 'http://localhost:3000'
// export const SERVER_BASE_URL = '/'

const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://127.0.0.1:3000' : 'https://new.icesspool.net'
export const LOGIN_URL = dev ? "/auth/login" : "https://new.icesspool.net/auth/login"

export const AWS_S3_URL = 'https://icesspool-files.s3.amazonaws.com/uploads/'




export const  OFFER_MADE = 1;
export const  OFFER_ACCEPTED = 2;
export const  PAYMENT_MADE = 3;
export const  WORK_STARTED_REQUEST = 4; //SP
export const  WORK_STARTED = 41; // CL
export const  WORK_NOT_STARTED = 40; // CL

export const  WORK_COMPLETED_REQUEST = 6; //SP OR CL

export const  WORK_COMPLETED = 51; //ADMIN, CL
export const  WORK_NOT_COMPLETED = 50; //ADMIN, CL

export const  OFFER_CLOSED = 6; //ADMIN
export const  OFFER_RATED = 7; // CL
export const  OFFER_CANCELLED_SP = 8; //SP
export const  OFFER_CANCELLED_CL = 9; //CL
export const  OFFER_REASSIGNED = 10;

