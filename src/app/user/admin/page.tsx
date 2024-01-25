export const dynamic = "force-dynamic";

import { getAdmins, getPages, getServiceAreas, getUserTypes } from "@/src/app/api-services";
import Admin from "@/src/components/user/Admin";
import { headers } from "next/headers";




export default async function Page({ searchParams }: any) {


    const pages = await getPages()
    const userTypes = await getUserTypes()
    const serviceAreas = await getServiceAreas(searchParams)
    const users = await getAdmins()

    let data = { pages, userTypes,serviceAreas,users }



    return <Admin data={data} />


}
