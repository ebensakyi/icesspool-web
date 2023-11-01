import { useSession } from 'next-auth/react';

import { headers } from 'next/headers';
import UserProfile from "@/src/components/user/UserProfile";

import { SERVER_BASE_URL } from '@/config';

async function getData() {


    const res = await fetch(`${SERVER_BASE_URL}/api/user/profile`, {  cache: 'no-store', method: "GET",
    headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function Page() {
    const userData = await getData();



    // const { data: session } = useSession()


    // var dateString = moment().format("DD-MM-yyyy-HH-mm-ss-a");





    let data = { userData }


    return <UserProfile data={data} />


}

