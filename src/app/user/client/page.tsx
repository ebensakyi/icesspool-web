export const dynamic = "force-dynamic";

import { LOGIN_URL, SERVER_BASE_URL } from "@/config";
import Client from "@/src/components/user/Client";
import { headers } from "next/headers";

async function getUsers(searchParams: any) {
  let { searchText } = searchParams;

  let { page } = searchParams;
    let response = await fetch(`${SERVER_BASE_URL}/api/user/client?page=${page}&searchText=${searchText}`,{ cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
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
    
    
       async function getUserTypes() {
    
        let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-type`, { cache: 'no-store', headers: headers() });
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return await response.json();
    
    }
    


export default async function Page({ searchParams }: any) {
  

    const users = await getUsers(searchParams);
    const userTypes = await getUserTypes()

    let data = { users, userTypes }



    return <Client data={data} />


}
