export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { WaterPricing } from '@/src/components/WaterPricing';
import { headers } from 'next/headers';



async function getRegions(searchParams: any) {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, {
      cache: "no-store",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }


  async function getServices(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/services?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }


async function getTruckClasses(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/truck-classification?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
  

  async function getWaterPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services/water/pricing?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const waterPricings = await getWaterPricing(searchParams, 1)

    

    let data = { regions, services,truckClassifications,waterPricings }



    return <WaterPricing data={data} />


}

