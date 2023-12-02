export const dynamic = "force-dynamic";

import Scanner from "@/src/components/user/Scanner";
import { getScanners, getServicePoints } from "@/src/api-services";




export default async function Page({ searchParams }: any) {
  

    const servicePoints = await getServicePoints(searchParams)
    const users = await getScanners()

    let data = { servicePoints, users }


    return <Scanner data={data} />


}
