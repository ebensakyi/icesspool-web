export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";
import Admin from "@/src/components/user/Admin";
import { headers } from "next/headers";

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


async function getUserTypes() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-type`, { cache: 'no-store', headers: headers() });
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



async function getAdmins(searchParams: any) {
    let { searchText } = searchParams;

    let { page } = searchParams;
    let response = await fetch(`${SERVER_BASE_URL}/api/user/admin?page=${page}&searchText=${searchText}`, { cache: 'no-store', headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const userTypes = await getUserTypes()
    const serviceAreas = await getServiceAreas(searchParams)
    const users = await getAdmins(searchParams)

    let data = {  userTypes, serviceAreas, users }



    return <Admin data={data} />


}
