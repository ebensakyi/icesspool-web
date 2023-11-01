export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from '@/config';
import FollowUp from '@/src/components/unused/submitted-data/FollowUp';
import { headers } from 'next/headers';

async function getSubmittedData(searchParams: any) {

    let { formId } = searchParams
 
    let { filterBy } = searchParams
    let { filterValue } = searchParams
    let { from } = searchParams
    let { to } = searchParams
    let { searchText } = searchParams
    let { page } = searchParams




    const res = await fetch(`${SERVER_BASE_URL}/api/submitted-data/follow-up?formId=${formId}&page=${page}&filterBy=${filterBy}&filterValue=${filterValue}&from=${from}&to=${to}&searchText=${searchText}`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function Page({ searchParams }: any) {
    const followUpData = await getSubmittedData(searchParams)

    // const { data: session } = useSession()

    let data = { followUpData: followUpData }

    return <FollowUp data={data} />


}

