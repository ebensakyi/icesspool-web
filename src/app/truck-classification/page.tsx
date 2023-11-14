import { getRegions, getServices, getTruckClassification } from '@/src/api-services';
import { TruckClassification } from '../../components/TruckClassification';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const truckClassifications = await getTruckClassification(searchParams)



    let data = { regions, services,truckClassifications }



    return <TruckClassification data={data} />


}

