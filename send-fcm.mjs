import { sendFCM } from "./libs/send-fcm";
const sendfcm =async ()=>{
    await sendFCM(
    "New Request",
    `Hello biodigester request is available`,
    'coVBGOLLQqCvtnfFa21BiH:APA91bGr4kayoIu7-Ck2XflmfCyo2eXyYvkmyi1_PGq_yEyAmURweokO-0R6HSD03YH_J5xLoHAWPIjpau-BAGthlRYYnIabC8bASV2E0iz8Drw9-OmUGEIUROh52jAMQg0fZmKpkvoZ'
  );
}
