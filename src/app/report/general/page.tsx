export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import GeneralReports from '@/src/components/report/GeneralReports';
import { headers } from 'next/headers';

async function getCommunities() {



    const res = await fetch(`${SERVER_BASE_URL}/api/primary-data/community`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
async function getDistricts() {
    const res = await fetch(`${SERVER_BASE_URL}/api/primary-data/district`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getRegions() {


    const res = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


async function getForms() {


    const res = await fetch(`${SERVER_BASE_URL}/api/primary-data/inspection-form`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {

    

    
    const communities = await getCommunities()

    const forms = await getForms()

    const regions = await getRegions()
    const districts = await getDistricts()


    let data:any = { regions, districts,communities, forms }



    return <GeneralReports data={data} />


}

