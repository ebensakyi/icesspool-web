export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";
import ServiceProvider from "@/src/components/user/ServiceProvider";
import { headers } from "next/headers";

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
  
  
     async function getUserTypes() {
  
      let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-type`, { cache: 'no-store', headers: headers() });
      if (!response.ok) {
          throw new Error('Failed to fetch data')
      }
      return await response.json();
  
  }
  
  
   async function getPages() {
  
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/pages`, { cache: 'no-store', headers: headers() });
  
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
  

export default async function Page({ searchParams }: any) {


    const pages = await getPages()
    const userTypes = await getUserTypes()
    const serviceAreas = await getServiceAreas(searchParams)
    const users = await getServiceProviders()

    let data = { pages, userTypes,serviceAreas,users }



    return <ServiceProvider data={data} />


}
