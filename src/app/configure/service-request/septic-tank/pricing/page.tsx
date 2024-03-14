export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { EmptyingPricing } from '@/src/components/DesludgingPricing';


async function getServiceAreas(searchParams: any) {
    try {
        let response = await fetch(`${SERVER_BASE_URL}/api/service-area`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return await response.json();
    } catch (error) {
        console.log("getServiceAreas==>");

    }


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
  


 async function getEmptyingPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services/septic-tank/pricing?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

export default async function Page({ searchParams }: any) {
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const serviceAreas = await getServiceAreas(searchParams)
    const emptyingPricings = await getEmptyingPricing(searchParams)

    



    let data = { truckClassifications, serviceAreas,emptyingPricings }



    return <EmptyingPricing data={data} />


}

