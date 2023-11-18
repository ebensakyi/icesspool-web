import {  getServiceAreas, getServices, getTruckClassification } from '@/src/api-services';
import { TruckClassification } from '../../components/TruckClassification';





export default async function Page({ searchParams }: any) {
    const serviceAreas = await getServiceAreas(searchParams)
    const services = await getServices(searchParams)
    const truckClassifications = await getTruckClassification(searchParams)



    let data = { serviceAreas, services,truckClassifications }



    return <TruckClassification data={data} />


}

