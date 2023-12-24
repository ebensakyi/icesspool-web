export const dynamic = "force-dynamic";

import { getBiodigesterServices, getServiceAreas } from '@/src/api-services';
import { BiodigesterPricing } from '@/src/components/BiodigesterPricing';





export default async function Page({ searchParams }: any) {
    const biodigesterServices = await getBiodigesterServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)



    let data = { biodigesterServices,serviceAreas }



    return <BiodigesterPricing data={data} />


}

