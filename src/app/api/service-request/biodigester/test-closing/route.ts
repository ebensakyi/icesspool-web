import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    let totalAmount = res.totalAmount;
let charges = {
  icesspoolPercentage:1,
  otherChargesPercentage:3,
  paymentChargesPercentage:5

}

      let moneyAllocations = await allocateFundsBiodigester(totalAmount, charges);

     

    return NextResponse.json({moneyAllocations});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

const allocateFundsBiodigester = async (
  discountedTotalCost: number,
  charges: any
) => {
  let icesspoolPercentage = charges.icesspoolPercentage/100;
  let paymentChargesPercentage = charges.icesspoolPercentage/100;
  let otherChargesPercentage = charges.icesspoolPercentage/100;
  const transactionAmount = discountedTotalCost;

  // const icesspoolAmount = transactionAmount * 0.07;
  // const charges = transactionAmount * 0.03;
  const icesspoolAmount = transactionAmount * icesspoolPercentage;
  const paymentCharges = transactionAmount * paymentChargesPercentage;
  const otherCharges = transactionAmount * otherChargesPercentage;
  const platformCharges = otherCharges + paymentCharges;

  const providerAmount =
    transactionAmount - (icesspoolAmount + platformCharges);

  return { icesspoolAmount, providerAmount, platformCharges };
};

const allocateFundsWaterTanker = (discountedTotalCost: number) => {
  const transactionAmount = discountedTotalCost;

  const icesspoolAmount = transactionAmount * 0.1;
  const tellerAmount = transactionAmount * 0.03;

  // const tamaleAmount = transactionAmount * 0.05;

  const providerAmount = transactionAmount - (icesspoolAmount + tellerAmount);
};
