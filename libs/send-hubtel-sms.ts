import axios from "axios";

export const sendSMS = (phone: string, message: string) => {
  var options = {
    method: "GET",
    url: "https://smsc.hubtel.com/v1/messages/send",
    params: {
      clientid: process.env.HUBTEL_CLIENT_ID,
      clientsecret: process.env.HUBTEL_CLIENT_SECRET,
      from: "ICESSPOOL",
      to: phone,
      content: message,
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
