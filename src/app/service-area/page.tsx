import { getRegions, getServiceAreas, getServices } from '@/src/api-services';
import { ServiceArea } from '@/src/components/ServiceArea';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)



    let data = { regions, services,serviceAreas }



    return <ServiceArea data={data} />


}

