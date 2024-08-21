// import { getServicePoints, getServices } from '@/src/app/api-services';
import { SERVER_BASE_URL } from '@/config';
import { IcesspoolEarnings } from '@/src/components/finance/IcesspoolEarnings';
import { headers } from 'next/headers';

async function getEarnings(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/finance/earnings/icesspool?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }




export default async function Page({ searchParams }: any) {
  const earnings = await getEarnings(searchParams)



  let data = { earnings }





    return <IcesspoolEarnings data={data} />


}

