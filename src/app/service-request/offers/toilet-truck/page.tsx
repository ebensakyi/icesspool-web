export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { ToiletTruckOffer } from '@/src/components/service-request/ToiletTruckOffer';
import { headers } from 'next/headers';


async function getOffers(searchParams: any) {
    let { searchText } = searchParams;

    let { page } = searchParams;

    const res = await fetch(
        `${SERVER_BASE_URL}/api/service-request/toilet-truck/offers?page=${page}&searchText=${searchText}`,
        { cache: "no-store", headers: headers() }
    );


    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}



export default async function Page({ searchParams }: any) {
    const offers = await getOffers(searchParams)






    let data = { offers }



    return <ToiletTruckOffer data={data} />


}

