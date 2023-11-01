
import { SERVER_BASE_URL } from '@/config';
import DataView from '@/src/components/unused/submitted-data/DataView';
import { headers } from 'next/headers';

async function getSubmittedData(searchParams: any) {

    let { formId } = searchParams
    let { published } = searchParams
    let { id } = searchParams





    const res = await fetch(`${SERVER_BASE_URL}/api/submitted-data/data-view?id=${id}&published=${published}&formId=${formId}`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function Page({ searchParams }: any) {
    const submittedData = await getSubmittedData(searchParams)



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



    let data = { submittedData: submittedData }



    return <DataView data={data} />


}

