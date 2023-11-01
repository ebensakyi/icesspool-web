import { prisma } from "../../prisma/db";

export const create = async (data: any) => {
  try {
    const response = await prisma.inspection.create({ data });

    return response;
  } catch (error) {
    return error;
  }
};

export const findOne = async (arg: any) => {
  try {
    const response = await prisma.inspection.findFirst(arg);

    return response;
  } catch (error) {
    return error;
  }
};
export const findMany = async (arg: any) => {
  const response = await prisma.inspection.create(arg);

  return response;
};
export const deleteOne = async (arg: any) => {
  const response = await prisma.inspection.delete(arg);

  return response;
};

export const update = async (arg: any) => {
  const response = await prisma.inspection.create(arg);

  return response;
};
