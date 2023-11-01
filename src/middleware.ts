// Without a defined matcher, this one line applies next-auth 
// to the entire project
export { default } from "next-auth/middleware"

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//  export const config = { matcher: ["/", "/user","/submitted-data"] }




export const config = { matcher: ["/", "/user","/submitted-data","/data-transfer","/user","/user/guide",
"/user/role","/user/log","/messaging/notification","/messaging/sms","/primary-data/community",
"/primary-data/district","/primary-data/electoral-area","/primary-data/other-data","/report/general",
"/submitted-data/data-edit","/submitted-data/data-view","/submitted-data"] }