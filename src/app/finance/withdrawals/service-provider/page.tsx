// import { getServicePoints, getServices } from '@/src/app/api-services';
import { SERVER_BASE_URL } from '@/config';
import { ServiceProviderWithdrawals } from '@/src/components/finance/ServiceProviderWithdrawals';
import { headers } from 'next/headers';

async function getWithdrawals(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/finance/withdrawals/service-provider?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }




export default async function Page({ searchParams }: any) {
    const withdrawals = await getWithdrawals(searchParams)



    let data = { withdrawals }



    return <ServiceProviderWithdrawals data={data} />


}

