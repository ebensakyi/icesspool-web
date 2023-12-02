export const dynamic = "force-dynamic";

import { LOGIN_URL, SERVER_BASE_URL } from "@/config";
import Role from "@/src/components/user/UserType";
import Scanner from "@/src/components/user/Scanner";
import { headers } from "next/headers";
import { getScanners, getServicePoints } from "@/src/api-services";




export default async function Page({ searchParams }: any) {
  

    const servicePoints = await getServicePoints(searchParams)
    const users = await getScanners()

    let data = { servicePoints, users }


    return <Scanner data={data} />


}
