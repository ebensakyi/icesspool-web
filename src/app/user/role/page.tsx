export const dynamic = "force-dynamic";

import { LOGIN_URL, SERVER_BASE_URL } from "@/config";
import { getUserTypes } from "@/src/api-services";
import Role from "@/src/components/user/Role";
import { headers } from "next/headers";

async function getPages() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/pages`,{ cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}





export default async function Page() {
  

    const pages = await getPages()
    const userTypes = await getUserTypes()

    let data = { pages, userTypes }



    return <Role data={data} />


}
