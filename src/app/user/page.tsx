export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";
import User from "@/src/components/user/User";
import { headers } from "next/headers";




async function getRoles() {

    let response = await fetch(`${SERVER_BASE_URL}/api/user/role`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getUserLevel() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-level`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getRegion() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

// async function getDistrict() {

//     let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/district`, { cache: 'no-store',headers: headers() });

//     if (!response.ok) {
//         throw new Error('Failed to fetch data')
//     }
//     return await response.json();

// }

async function getUsers(searchParams: any) {
    let { searchText } = searchParams
    let { page } = searchParams

    let response = await fetch(`${SERVER_BASE_URL}/api/user?page=${page}&searchText=${searchText}`, { cache: 'no-store',headers: headers() });
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {
    const users = await getUsers(searchParams)
    const roles = await getRoles()
    const userLevels = await getUserLevel()
    const regions = await getRegion()
    // const districts = await getDistrict()

    let data = { users, roles, userLevels, regions }



    return (

        <User data={data} />

    )
}
