export const dynamic = "force-dynamic";

import Scanner from "@/src/components/user/Scanner";
import { getScanners, getServicePoints, getServices } from "@/src/app/api-services";




export default async function Page({ searchParams }: any) {
  

    const servicePoints = await getServicePoints(searchParams)
    const users = await getScanners()
    const services = await getServices(searchParams)

    
    let data = { servicePoints, users,services }


    return <Scanner data={data} />


}
