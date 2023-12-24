export const dynamic = "force-dynamic";

import { getServiceAreas, getServicePoints, getServices } from '@/src/api-services';
import { BiodigesterPricing } from '@/src/components/BiodigesterPricing';





export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)



    let data = { servicePoints, services,serviceAreas }



    return <BiodigesterPricing data={data} />


}

