export const dynamic = "force-dynamic";

import { LOGIN_URL, SERVER_BASE_URL } from "@/config";
import District from "@/src/components/unused/primary-data/District";
import { headers } from "next/headers"


async function getRegions() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, {
        cache: 'no-store', method: "GET",
        headers: headers()
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}
async function getDistricts(searchParams: any) {
    let { page } = searchParams
    let { searchText } = searchParams

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/district?page=${page}&searchText=${searchText}`, {  cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {

    const regions = await getRegions()
    const districts = await getDistricts(searchParams)


    let data = { regions, districts }





    return <District data={data} />


}
