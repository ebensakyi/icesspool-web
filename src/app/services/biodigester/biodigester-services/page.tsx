export const dynamic = "force-dynamic";
import { getBiodigesterServices } from '@/src/api-services';
import { BiodigesterService } from '@/src/components/BiodigesterService';




export default async function Page({ searchParams }: any) {
    const services = await getBiodigesterServices(searchParams)



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



    return <BiodigesterService data={data} />


}

