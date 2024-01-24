import { getServicePoints, getServices } from '@/src/api-services';
import { MakeEmptyingRequest } from '@/src/components/MakeDesludgingRequest';





export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)



    let data = { servicePoints, services }



    return <MakeEmptyingRequest data={data} />


}

