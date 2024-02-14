import axios from "axios";

export const initiatePayment = async (
  paymentId: String,
  amount: String,
  paymentMethod: String
) => {
  const options: any = {
    method: "POST",
    url: process.env.TELLER_URL,
    rejectUnauthorized: true,
    headers: {
      "content-type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: process.env.TELLER_API,
    },
    params: {
      merchant_id: process.env.MERCHANT_ID,
      transaction_id: paymentId,
      payment_method: paymentMethod,
      desc: "Payment for iCesspool",
      amount: amount,
      //redirect_url: "http://192.168.8.116:3000/api/v1/complete-payment",
      redirect_url: process.env.REDIRECT_URL,
      email: "info@icesspool.net",
    },
    json: true,
  };

  let response = await axios.request(options);

  return response.data;
};
