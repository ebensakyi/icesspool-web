// import { getServicePoints, getServices } from '@/src/app/api-services';
import { SERVER_BASE_URL } from '@/config';
import { IcesspoolBalance } from '@/src/components/finance/IcesspoolBalance';
import { headers } from 'next/headers';

async function getRequests(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/finance/balances/icesspool?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }




export default async function Page({ searchParams }: any) {
    const requests = await getRequests(searchParams)



    let data = { requests }



    return <IcesspoolBalance data={data} />


}

