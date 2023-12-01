export const dynamic = "force-dynamic";

import { getPages, getUserTypes } from "@/src/api-services";
import Admin from "@/src/components/user/Admin";
import { headers } from "next/headers";




export default async function Page() {


    const pages = await getPages()
    const userTypes = await getUserTypes()

    let data = { pages, userTypes }



    return <Admin data={data} />


}
