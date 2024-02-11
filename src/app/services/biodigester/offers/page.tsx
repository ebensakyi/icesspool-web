export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import { BiodigesterOffer } from '@/src/components/BiodigesterOffer';
import { headers } from 'next/headers';


async function getBiodigesterOffers(searchParams: any) {
    let { searchText } = searchParams;

    let { page } = searchParams;

    const res = await fetch(
        `${SERVER_BASE_URL}/api/services/biodigester/offers?page=${page}&searchText=${searchText}`,
        { cache: "no-store", headers: headers() }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}



export default async function Page({ searchParams }: any) {
    const biodigesterOffers = await getBiodigesterOffers(searchParams)
   





    let data = { biodigesterOffers}



    return <BiodigesterOffer data={data} />


}

