import { getRegions, getServicePoints, getServices } from '@/src/api-services';
import { Desludging } from '@/src/components/Desludging';





export default async function Page({ searchParams }: any) {
    const regions = await getRegions(searchParams)
    const services = await getServices(searchParams)



    let data = { regions, services }



    return <Desludging data={data} />


}

