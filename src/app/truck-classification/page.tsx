import { getRegions, getServiceLocations, getServices } from '@/src/api-services';
import { ServiceLocation } from '@/src/components/ServiceLocation';
import { TruckClassification } from '../../components/TruckClassification';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)
    const serviceLocations = await getServiceLocations(searchParams)



    let data = { regions, services,serviceLocations }



    return <TruckClassification data={data} />


}

