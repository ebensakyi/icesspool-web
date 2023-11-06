import { SERVER_BASE_URL } from '@/config';
import { ServicePoint } from '@/src/components/ServicePoint';
import { headers } from 'next/headers';

async function getServicePoints(searchParams: any) {

    let { searchText } = searchParams

    let { page } = searchParams




    const res = await fetch(`${SERVER_BASE_URL}/api/service-points?page=${page}&searchText=${searchText}`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


  

export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)



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



    let data = {servicePoints}



    return <ServicePoint data={data} />


}

