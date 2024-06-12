export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { WaterPricing } from '@/src/components/service-request/WaterPricing';
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




async function getTruckClasses(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/configure/truck-classification?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
  

  async function getWaterPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/pricing/water-tanker-service`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const waterPricings = await getWaterPricing(searchParams, 1)

    

    let data = { regions,truckClassifications,waterPricings }



    return <WaterPricing data={data} />


}

