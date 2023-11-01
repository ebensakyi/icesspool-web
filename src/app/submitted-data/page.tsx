import Data from '@/src/components/submitted-data/Data';
import { SERVER_BASE_URL } from '@/config';
import { headers } from 'next/headers';

async function getSubmittedData(searchParams: any) {

    let { formId } = searchParams
    let { published } = searchParams
    let { deleted } = searchParams

    let { filterBy } = searchParams
    let { filterValue } = searchParams
    let { from } = searchParams
    let { to } = searchParams
    let { searchText } = searchParams
    let { page } = searchParams




    const res = await fetch(`${SERVER_BASE_URL}/api/submitted-data?published=${published}&deleted=${deleted}&formId=${formId}&page=${page}&filterBy=${filterBy}&filterValue=${filterValue}&from=${from}&to=${to}&searchText=${searchText}`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getRegions() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, { cache: 'no-store' });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return await response.json();
  
  }
  

export default async function Page({ searchParams }: any) {
    const submittedData = await getSubmittedData(searchParams)


    const regions = await getRegions()

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



    let data = { submittedData: submittedData ,regions}



    return <Data data={data} />


}

