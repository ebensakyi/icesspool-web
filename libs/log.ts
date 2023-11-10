import { prisma } from "../prisma/db";

export const logActivity = async (activity:string, userId:number) => {
  try {
    let data = {
      activity,
      userId,
    };
    await prisma.logs.create({ data });
  } catch (error) {
    return;
  }
};
