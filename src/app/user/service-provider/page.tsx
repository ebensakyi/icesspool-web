export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";
import ServiceProvider from "@/src/components/user/ServiceProvider";
import { headers } from "next/headers";

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
  
  async function getServices() {
    try {
       let response = await fetch(`${SERVER_BASE_URL}/api/configure/services`, {
        cache: "no-store",
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.log("getServices==>");
      
    }
    
     
    }
     async function getUserTypes() {
  
      let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-type`, { cache: 'no-store', headers: headers() });
      if (!response.ok) {
          throw new Error('Failed to fetch data')
      }
      return await response.json();
  
  }

  
  
   async function getServiceProviders() {
  
    let response = await fetch(`${SERVER_BASE_URL}/api/user/service-provider`, { cache: 'no-store', headers: headers() });
  
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
  
  }
  
  async function getMomoNetworks() {
  
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/momo-network`, { cache: 'no-store', headers: headers() });
  
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
  
  }
export default async function Page({ searchParams }: any) {


    const services = await getServices()
    const userTypes = await getUserTypes()
    const serviceAreas = await getServiceAreas(searchParams)
    const users = await getServiceProviders()
    const momoNetworks = await getMomoNetworks()

    let data = { services, userTypes,serviceAreas,users,momoNetworks }



    return <ServiceProvider data={data} />


}
