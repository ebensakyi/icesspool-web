import { getRegions, getServiceAreas, getServices } from '@/src/api-services';
import { ServicesInArea } from '@/src/components/ServicesInArea';





export default async function Page({ searchParams }: any) {
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)



    let data = {  services,serviceAreas }



    return <ServicesInArea data={data} />


}

