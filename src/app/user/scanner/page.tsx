export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";
import Scanner from "@/src/components/user/Scanner";
import { headers } from "next/headers";
async function getServices(searchParams: any) {
  let { searchText } = searchParams;

  let { page } = searchParams;

  const res = await fetch(
    `${SERVER_BASE_URL}/api/configure/services?page=${page}&searchText=${searchText}`,
    { cache: "no-store", headers: headers() }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


async function getServiceAreas(searchParams: any) {
  try {
    let response = await fetch(`${SERVER_BASE_URL}/api/configure/service-area`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.log("getServiceAreas==>", error);

  }


}

async function getServicePoints(searchParams: any) {
  let { searchText } = searchParams;

  let { page } = searchParams;

  const res = await fetch(
    `${SERVER_BASE_URL}/api/service-point?page=${page}&searchText=${searchText}`,
    { cache: "no-store", headers: headers() }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}



async function getScanners() {

  let response = await fetch(`${SERVER_BASE_URL}/api/user/scanner`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return await response.json();

}




export default async function Page({ searchParams }: any) {


  const servicePoints = await getServicePoints(searchParams)
  const users = await getScanners()
  const services = await getServices(searchParams)
  const serviceAreas = await getServiceAreas(searchParams)


  let data = { serviceAreas, servicePoints, users, services, }


  return <Scanner data={data} />


}
