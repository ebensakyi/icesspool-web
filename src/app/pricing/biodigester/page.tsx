export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { BiodigesterPricing } from '@/src/components/BiodigesterPricing';
import { headers } from 'next/headers';


async function getBiodigesterServices(searchParams: any) {
    let { searchText } = searchParams;

    let { page } = searchParams;

    const res = await fetch(
        `${SERVER_BASE_URL}/api/configure/biodigester-sub-services?page=${page}&searchText=${searchText}`,
        { cache: "no-store", headers: headers() }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

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

async function getBiodigesterPricing(searchParams: any, service?: number) {
    let response = await fetch(
        `${SERVER_BASE_URL}/api/pricing/biodigester-service`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return await response.json();
}



export default async function Page({ searchParams }: any) {
    const biodigesterServices = await getBiodigesterServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)
    const pricing = await getBiodigesterPricing(searchParams)





    let data = { biodigesterServices, serviceAreas, pricing }



    return <BiodigesterPricing data={data} />


}

