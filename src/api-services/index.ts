import { SERVER_BASE_URL } from "@/config"
import { headers } from "next/headers"

export async function getServices(searchParams: any) {

    let { searchText } = searchParams

    let { page } = searchParams

    const res = await fetch(`${SERVER_BASE_URL}/api/services?page=${page}&searchText=${searchText}`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export async function getServicePoints(searchParams: any) {

    let { searchText } = searchParams

    let { page } = searchParams

    const res = await fetch(`${SERVER_BASE_URL}/api/service-points?page=${page}&searchText=${searchText}`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}




export async function getRegions(searchParams:any) {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return await response.json();
  
  }

  export async function getServiceLocations(searchParams:any) {

    let response = await fetch(`${SERVER_BASE_URL}/api/service-location`, { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return await response.json();
  
  }