import { getRegions, getServicePoints, getServices } from '@/src/api-services';
import { WaterPricing } from '@/src/components/WaterPricing';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)



    let data = { regions, services }



    return <WaterPricing data={data} />


}

