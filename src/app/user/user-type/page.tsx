export const dynamic = "force-dynamic";

import { LOGIN_URL, SERVER_BASE_URL } from "@/config";
import { getPages, getUserTypes } from "@/src/api-services";
import Role from "@/src/components/user/UserType";
import { headers } from "next/headers";





export default async function Page() {
  

    const pages = await getPages()
    const userTypes = await getUserTypes()

    let data = { pages, userTypes }



    return <Role data={data} />


}
