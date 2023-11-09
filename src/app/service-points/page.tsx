import { SERVER_BASE_URL } from '@/config';
import { ServicePoint } from '@/src/components/ServicePoint';
import { getServicePoints, getServices } from '@/src/api-services';
import { headers } from 'next/headers';





export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)



    // const { data: session } = useSession()



    // const router = useRouter();
    // const searchParams = useSearchParams()
    // const pathname = usePathname()



    // var dateString = moment().format("DD-MM-yyyy-HH-mm-ss-a");

    // // const query = router.query;
    // const formId = Number(searchParams.get('formId'))
    // const published = Number(searchParams.get('published'))
    // const page = Number(searchParams.get('page'))
    // const searchtext = Number(searchParams.get('searchText'))



    let data = { servicePoints, services }



    return <ServicePoint data={data} />


}

