export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from '@/config';
import { ServiceArea } from '@/src/components/ServiceArea';
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


  async function getRegions(searchParams: any) {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, {
      cache: "no-store",
    });
  
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
    
  }
  
   
  }
  

export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)



    let data = { regions, services,serviceAreas }



    return <ServiceArea data={data} />


}

