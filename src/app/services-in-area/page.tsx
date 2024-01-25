export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { ServicesInArea } from '@/src/components/ServicesInArea';
import { headers } from 'next/headers';




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

  async function getServicesInAreas(searchParams: any) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services-in-area`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
  

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

export default async function Page({ searchParams }: any) {
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)
    const servicesInAreas = await getServicesInAreas(searchParams)



    let data = {  services,serviceAreas,servicesInAreas }



    return <ServicesInArea data={data} />


}

