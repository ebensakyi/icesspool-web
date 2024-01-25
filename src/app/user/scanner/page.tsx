export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";
import Scanner from "@/src/components/user/Scanner";
import { headers } from "next/headers";
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
  
  
  
   async function getServicePoints(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/service-points?page=${page}&searchText=${searchText}`,
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

    
    let data = { servicePoints, users,services }


    return <Scanner data={data} />


}
