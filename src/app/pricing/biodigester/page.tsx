export const dynamic = "force-dynamic";

import { getServiceAreas, getServicePoints, getServices } from '@/src/api-services';
import { BiodigesterPricing } from '@/src/components/BiodigesterPricing';





export default async function Page({ searchParams }: any) {
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)



    let data = { services,serviceAreas }



    return <BiodigesterPricing data={data} />


}

