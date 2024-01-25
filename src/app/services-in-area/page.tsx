export const dynamic = "force-dynamic";

import { ServicesInArea } from '@/src/components/ServicesInArea';





export default async function Page({ searchParams }: any) {
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)
    const servicesInAreas = await getServicesInAreas(searchParams)



    let data = {  services,serviceAreas,servicesInAreas }



    return <ServicesInArea data={data} />


}

