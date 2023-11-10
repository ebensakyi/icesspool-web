import { getRegions, getServiceLocations, getServices } from '@/src/api-services';
import { ServiceLocation } from '@/src/components/ServiceLocation';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const serviceLocations = await getServiceLocations(searchParams)



    let data = { regions, services,serviceLocations }



    return <ServiceLocation data={data} />


}

