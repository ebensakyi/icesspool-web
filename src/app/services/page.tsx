export const dynamic = "force-dynamic";
import { Service } from '@/src/components/Service';
import { getServices } from '@/src/api-services';




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



    let data = { services }



    return <Service data={data} />


}

