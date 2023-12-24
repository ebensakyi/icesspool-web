export const dynamic = "force-dynamic";

import { getRegions, getServicePoints, getServices } from '@/src/api-services';
import { BiodigesterPricing } from '@/src/components/BiodigesterPricing';





export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)
    const regions = await getRegions(searchParams)



    let data = { servicePoints, services,regions }



    return <BiodigesterPricing data={data} />


}

