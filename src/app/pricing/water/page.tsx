import { getRegions, getServicePoints, getServices, getTruckClasses } from '@/src/api-services';
import { WaterPricing } from '@/src/components/WaterPricing';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const truckClassifications = await getTruckClasses(searchParams, 1)



    let data = { regions, services,truckClassifications }



    return <WaterPricing data={data} />


}

