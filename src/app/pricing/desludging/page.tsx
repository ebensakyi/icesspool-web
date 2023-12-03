export const dynamic = "force-dynamic";

import { getRegions, getEmptyingPricing, getServices, getTruckClasses } from '@/src/api-services';
import { EmptyingPricing } from '@/src/components/EmptyingPricing';





export default async function Page({ searchParams }: any) {
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const regions = await getRegions(searchParams)
    const emptyingPricings = await getEmptyingPricing(searchParams)

    



    let data = { truckClassifications, regions,emptyingPricings }



    return <EmptyingPricing data={data} />


}

