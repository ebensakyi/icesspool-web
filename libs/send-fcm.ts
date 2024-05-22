import admin from "../config/firebaseAdmin"; // Path to firebaseAdmin.js

// Function to send FCM notification
export const sendFCM = async (
  title: string,
  body: string,
  deviceToken: any
) => {


   try {
     // Send FCM notification
   let res = await admin.messaging().send({
      token: deviceToken,
      notification: {
        title: title,
        body: body,
      },
    });    
    return res;
  } catch (error) {
    console.error("Error sending FCM notification:", error);
  }
};


export const sendFCToMultipleDevices = async (title:string, body:string,deviceTokens:any) => {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      tokens: deviceTokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log('Successfully sent messages:', response);
    if (response.failureCount > 0) {
      const failedTokens: any[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(deviceTokens[idx]);
        }
      });
      console.log('List of tokens that caused failures:', failedTokens);
    }
  } catch (error) {
    console.error('Error sending FCM notification:', error);
  }
};