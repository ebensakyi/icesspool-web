import { ServicePoint } from '@/src/components/ServicePoint';
import { getRegions, getServicePoints, getServices, getTruckClasses } from '@/src/api-services';
import { Desludging } from '@/src/components/Desludging';





export default async function Page({ searchParams }: any) {
    const truckClassifications = await getTruckClasses(searchParams, 1)
    const regions = await getRegions(searchParams)



    let data = { truckClassifications, regions }



    return <Desludging data={data} />


}

