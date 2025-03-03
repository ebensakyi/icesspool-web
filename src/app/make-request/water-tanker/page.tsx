// import { getServicePoints, getServices } from '@/src/app/api-services';
import { SERVER_BASE_URL } from '@/config';
import { MakeWaterTankerRequest } from '@/src/components/web-requests/MakeWaterTankerRequest';
import { headers } from 'next/headers';



async function getOffers(searchParams: any) {
  let { searchText } = searchParams;

  let { page } = searchParams;

  const res = await fetch(
      `${SERVER_BASE_URL}/api/web-request/toilet-truck?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
  );


  if (!res.ok) {
      throw new Error("Failed to fetch data");
  }

  return res.json();
}

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

  async function getTruckClassifications(searchParams: any) {
    try {
      let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/truck-classification?serviceId=2`, { cache: "no-store", headers: headers() });
  
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
      `${SERVER_BASE_URL}/api/configure/service-points?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

  async function getTimeFrames(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/configure/time-schedule?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)

    const serviceAreas = await getServiceAreas(searchParams)
    const timeFrames = await getTimeFrames(searchParams)
    const offers = await getOffers(searchParams)
    const truckClassifications = await getTruckClassifications(searchParams)


    let data = { servicePoints, services,serviceAreas,timeFrames,offers ,truckClassifications}



    return <MakeWaterTankerRequest data={data} />


}

