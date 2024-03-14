export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { TruckClassification } from '../../../components/TruckClassification';
import { headers } from 'next/headers';

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
      console.log("getServiceAreas==>");
      
    }
    
     
    }

async function getTruckClassification(searchParams: any) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/configure/truck-classification`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
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
  
export default async function Page({ searchParams }: any) {
    const serviceAreas = await getServiceAreas(searchParams)
    const services = await getServices(searchParams)
    const truckClassifications = await getTruckClassification(searchParams)



    let data = { serviceAreas, services,truckClassifications }



    return <TruckClassification data={data} />


}

