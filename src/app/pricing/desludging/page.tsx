import { getRegions, getDesludgingPricing, getServices, getTruckClasses } from '@/src/api-services';
import { Desludging } from '@/src/components/Desludging';





export default async function Page({ searchParams }: any) {
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const regions = await getRegions(searchParams)
    const desludgingPricings = await getDesludgingPricing(searchParams)

    



    let data = { truckClassifications, regions,desludgingPricings }



    return <Desludging data={data} />


}

