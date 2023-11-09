import { SERVER_BASE_URL } from '@/config';
import { Service } from '@/src/components/Service';
import { ServicePoint } from '@/src/components/ServicePoint';
import { getServices } from '@/src/api-services';
import { headers } from 'next/headers';


  

export default async function Page({ searchParams }: any) {
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



    let data = {services}



    return <Service data={data} />


}

