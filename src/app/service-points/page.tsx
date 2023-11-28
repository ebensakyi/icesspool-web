export const dynamic = "force-dynamic";
import { ServicePoint } from '@/src/components/ServicePoint';
import { getServicePoints, getServices } from '@/src/api-services';





export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)



    let data = { servicePoints, services }



    return <ServicePoint data={data} />


}

