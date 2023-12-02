export const dynamic = "force-dynamic";

import { getPages, getServiceAreas, getUserTypes } from "@/src/api-services";
import Admin from "@/src/components/user/Admin";
import { headers } from "next/headers";




export default async function Page({ searchParams }: any) {


    const pages = await getPages()
    const userTypes = await getUserTypes()
    const serviceAreas = await getServiceAreas(searchParams)

    let data = { pages, userTypes,serviceAreas }



    return <Admin data={data} />


}
