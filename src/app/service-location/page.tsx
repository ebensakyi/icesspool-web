import { getRegions, getServices } from '@/src/api-services';
import { ServiceLocation } from '@/src/components/ServiceLocation';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)



    let data = { regions, services }



    return <ServiceLocation data={data} />


}

