export const dynamic = "force-dynamic";

import { getBiodigesterPricing, getBiodigesterServices, getServiceAreas } from '@/src/api-services';
import { BiodigesterPricing } from '@/src/components/BiodigesterPricing';





export default async function Page({ searchParams }: any) {
    const biodigesterServices = await getBiodigesterServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)
    const pricing = await getBiodigesterPricing(searchParams)

    



    let data = { biodigesterServices,serviceAreas ,pricing}



    return <BiodigesterPricing data={data} />


}

