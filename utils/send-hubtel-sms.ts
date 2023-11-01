import axios from "axios";

export const sendSMS = (phone:string, message:string) => {
    var options = {
        method: 'GET',
        url: 'https://smsc.hubtel.com/v1/messages/send',
        params: {
          clientsecret: 'hqjzitrg',
          clientid: 'ngsnegro',
          from: 'ESICAppsSMS',
          to: phone,
          content: message
        }
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
  

