export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from '@/config';
import { Penalty } from '@/src/components/Penalty';
import { Service } from '@/src/components/Service';
import { headers } from 'next/headers';


async function getPenalty(searchParams: any) {
    let { searchText } = searchParams;
  
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/config/penalty`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }
  

export default async function Page({ searchParams }: any) {
    const penalty = await getPenalty(searchParams)



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



    let data = { penalty }



    return <Penalty data={data} />


}

