export const dynamic = "force-dynamic";

import { getRegions, getServicePoints, getServices, getTruckClasses, getWaterPricing } from '@/src/api-services';
import { WaterPricing } from '@/src/components/WaterPricing';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const waterPricings = await getWaterPricing(searchParams, 1)

    

    let data = { regions, services,truckClassifications,waterPricings }



    return <WaterPricing data={data} />


}

