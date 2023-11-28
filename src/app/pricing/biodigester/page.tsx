export const dynamic = "force-dynamic";

import { getServicePoints, getServices } from '@/src/api-services';
import { BiodigesterPricing } from '@/src/components/BiodigesterPricing';





export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)



    let data = { servicePoints, services }



    return <BiodigesterPricing data={data} />


}

