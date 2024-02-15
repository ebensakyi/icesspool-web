import axios from "axios";

export const sendFCM = async (title: string, body: string, fcmId: any) => {
  let options:any = {
    method: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization: process.env.FCM_AUTH_KEY,
      "Content-Type": "application/json",
    },
    data: {
      // to: "fcQ7yPEqRO6JEQxbPVCnUh:APA91bEYwrPvA_vpXBYzp2RnFKGrOK12PqwrNYCOsSAmqry_x2WJzbk2eXqOIlAQBsMafGXICGvSfeFea2RVss3U4yRjRwFUMPLr6GZdTGoqFaSlSx13m81ZKSzSjoPTyXKzP4BJqtea",
      to: fcmId,
      collapse_key: "type_a",
      notification: { body, title },
      data: {
        body,
        title,
        // key_1: 'Value for key_1',
        // key_2: 'Value for key_2'
      },
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const sendBulkFCM = async (title:string, body:string, fcmId:string) => {
  let options:any = {
    method: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization: process.env.FCM_AUTH_KEY,
      "Content-Type": "application/json",
    },
    data: {
      registration_ids: fcmId,
      collapse_key: "type_a",
      notification: { body, title },
      data: {
        body,
        title,
        // key_1: 'Value for key_1',
        // key_2: 'Value for key_2'
      },
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
