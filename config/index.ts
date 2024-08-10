//export const SERVER_BASE_URL = 'http://localhost:3000'
// export const SERVER_BASE_URL = '/'

const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://127.0.0.1:3000' : 'https://app.icesspool.net'
export const LOGIN_URL = dev ? "/auth/login" : "https://app.icesspool.net/auth/login"

export const AWS_S3_URL = 'https://icesspool-files.s3.amazonaws.com/uploads/'




export const OFFER_MADE = 1;
export const OFFER_ACCEPTED = 2;
export const OFFER_IN_PROGRESS = 3;
export const OFFER_COMPLETED = 4;
export const OFFER_CLOSED = 5;

export const OFFER_RATED = 6; // CL
export const OFFER_CANCELLED_SP = 7; //SP
export const OFFER_CANCELLED_CL = 8; //CL
export const OFFER_REASSIGNED = 9;

//Requests and Approvals
export const WORK_STARTED_REQUEST = 20; //SP
export const WORK_STARTED = 21; // CL
export const WORK_NOT_STARTED = 22; // CL

export const WORK_COMPLETED_REQUEST = 30; //SP OR CL
export const WORK_COMPLETED = 31; //ADMIN, CL
export const WORK_NOT_COMPLETED = 32; //ADMIN, CL

export const  MOBILE_DEVICE = "MOBILE";



