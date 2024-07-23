export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { WaterOffer } from '@/src/components/service-request/WaterOffer';
import { headers } from 'next/headers';


async function getWaterOffers(searchParams: any) {
    let { searchText } = searchParams;

    let { page } = searchParams;

    const res = await fetch(
        `${SERVER_BASE_URL}/api/service-request/water-tanker/offers?page=${page}&searchText=${searchText}`,
        { cache: "no-store", headers: headers() }
    );
    

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}



export default async function Page({ searchParams }: any) {
    const offers = await getWaterOffers(searchParams)
   





    let data = { offers}



    return <WaterOffer data={data} />


}

