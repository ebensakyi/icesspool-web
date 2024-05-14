import { amtConverter } from "@/libs/amount-converter";
import { prisma } from "@/prisma/db";
import axios from "axios";
import moment from "moment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const now = moment();

    const res = await request.json();

    // let userId = Number(res.userId);
    // let serviceProviderId = Number(res.serviceProviderId);
    let withdrawalId = Number(res.id);

    //   const sp = await prisma.serviceProvider.findFirst({
    //     where: { deleted: 0, userId: userId },
    //   });

    //   let serviceProviderId: any = sp?.id;

    let withdraw = await prisma.serviceProviderWithdrawal.findFirst({
      where: {
        id: withdrawalId,
        deleted: 0,
        status: 0,
      },
      include: {
        ServiceProvider: {
          include: {
            MomoAccount: {
              include: {
                MomoNetwork: true,
              },
            },
          },
        },
      },
    });

    let momoNumber = withdraw?.ServiceProvider?.MomoAccount?.momoNumber;
    let momoNetwork =
      withdraw?.ServiceProvider?.MomoAccount?.MomoNetwork?.abbrv;
    let amount = withdraw?.amount;


    // Define the target time using moment
    const targetTime = moment(withdraw?.updatedAt, "YYYY-MM-DD HH:mm:ss.SSS");

    // Calculate the difference using moment
    const timeDifference = moment.duration(now.diff(targetTime));

    const hoursDifference = timeDifference.asHours();
    //Skip duplicate withdrawals
    if (hoursDifference < 1) {
        return NextResponse.json({message:"Cannot send duplicate requests"},{status:201});
    }

    //SEND MOMO TO SP

    let momoRes = await sendMoMo(momoNumber, momoNetwork, amount);
    if (momoRes.code != "000") {
        return NextResponse.json({message:"Error occurred while teller was processing request"},{status:201});
    }
    //await sendMOMO()

    //update status
    let x = await prisma.serviceProviderWithdrawal.update({
      data: {
        status: 1,
      },
      where: {
        id: withdraw?.id,
      },
    });

    // Reset balance to 0.0
    await prisma.serviceProviderBalance.update({
      data: {
        balance: 0.0,
      },
      where: {
        serviceProviderId: withdraw?.serviceProviderId,
      },
    });
    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

const sendMoMo = async (momoNetwork: any, momoNumber: any, amount: any) => {
  try {
    let _amount = await amtConverter(amount + "");
    let random = await generateRandom(12);

    //   let options = {
    //     method: "POST",
    //     url: "https://prod.theteller.net/v1.1/transaction/process",
    //     headers: {
    //       "content-type": "application/json",
    //       "authorization": "Basic aWNlc3Nwb29sNWRkN2E5M2QyNTgwZTpNR0kxT1dJNVltUTNZV1kzWkdFM1ptRTNOakUwTUdZMVpqa3hPV1ZrWkRFPQ==",
    //     },
    //     data: {
    //       account_number: momoNumber,
    //       account_issuer: momoNetwork,
    //       merchant_id: "TTM-00001079",
    //       transaction_id: random,
    //       processing_code: "404000",
    //       "r-switch": "FLT",
    //       desc: "iCesspool payment for an amount of " + amount,
    //       pass_code: "952db7a88fa23f34bf7fcecbe453877e",
    //       amount: _amount,
    //     },
    //   };

    //   console.log("OPTIONS====> ", options);

    //   const response = await axios(options);
    //   console.log("Response data:", response.data);
    //   return response.data;

    var options = {
      method: "POST",
      url: "https://prod.theteller.net/v1.1/transaction/process",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic aWNlc3Nwb29sNWRkN2E5M2QyNTgwZTpNR0kxT1dJNVltUTNZV1kzWkdFM1ptRTNOakUwTUdZMVpqa3hPV1ZrWkRFPQ==",
      },
      data: {
        account_number: "0543212322",
        account_issuer: "MTN",
        merchant_id: "TTM-00001079",
        transaction_id: random,
        processing_code: "404000",
        "r-switch": "FLT",
        desc: "iCesspool payment for an amount of GHS " + amount,
        pass_code: "952db7a88fa23f34bf7fcecbe453877e",
        amount: _amount,
      },
    };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    const response = await axios(options);
    // console.log("response===> " + response.data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const generateRandom = async (length: number) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
