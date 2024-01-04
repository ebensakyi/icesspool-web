export const dynamic = "force-dynamic";

import { getRegions, getEmptyingPricing, getServices, getTruckClasses, getServiceAreas } from '@/src/api-services';
import { EmptyingPricing } from '@/src/components/DesludgingPricing';





export default async function Page({ searchParams }: any) {
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const serviceAreas = await getServiceAreas(searchParams)
    const emptyingPricings = await getEmptyingPricing(searchParams)

    



    let data = { truckClassifications, serviceAreas,emptyingPricings }



    return <EmptyingPricing data={data} />


}

