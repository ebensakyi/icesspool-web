import { ServicePoint } from '@/src/components/ServicePoint';
import { getServicePoints, getServices } from '@/src/api-services';
import { Desludging } from '@/src/components/Desludging';





export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)



    let data = { servicePoints, services }



    return <Desludging data={data} />


}

