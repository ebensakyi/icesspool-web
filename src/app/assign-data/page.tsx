export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import DataTransfer from '@/src/components/unused/assign-data/AssignData';
import { headers } from 'next/headers';


async function getAssignData() {


    const res = await fetch(`${SERVER_BASE_URL}/api/assign-data`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
async function getDistricts() {


const res = await fetch(
    `${SERVER_BASE_URL}/api/primary-data/district`
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
}

return res.json()

}
export default async function Page() {

    const assignments = await getAssignData()
    const districts = await getDistricts()



    let data: any = { assignments, districts }



    return <DataTransfer data={data} />


}

