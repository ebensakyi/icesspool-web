export const dynamic = "force-dynamic";

import {  SERVER_BASE_URL } from "@/config";
import Community from "@/src/components/unused/primary-data/Community";
import { headers } from "next/headers";


async function getRegions() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, { cache: 'no-store', headers: headers()});

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getDistricts() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/district`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



async function getCommunities(searchParams: any) {
    let { page } = searchParams
    let { searchText } = searchParams


    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/community?page=${page}&searchText=${searchText}`, { cache: 'no-store',headers: headers() });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



export default async function Page({ searchParams }: any) {
  
    const regions = await getRegions()
      const districts = await getDistricts()

    const communities = await getCommunities(searchParams)

    let data = {regions,districts, communities }

    



    return <Community data={data} />


}
