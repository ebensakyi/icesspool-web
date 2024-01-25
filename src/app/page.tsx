import Dashboard from '../components/Dashboard'
import { SERVER_BASE_URL } from '@/config'
import { headers } from 'next/headers'
import { getServerSession } from "next-auth";
import { authOptions } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import {  getRegions } from '@/src/app/api-services';


async function getDashboardData(searchParams: any) {
  // let { filterBy } = searchParams
  // let { filterValue } = searchParams
  // let { from } = searchParams
  // let { to } = searchParams



  // const res = await fetch(`${SERVER_BASE_URL}/api/dashboard?filterBy=${filterBy}&filterValue=${filterValue}&from=${from}&to=${to}`, {
  //   cache: 'no-store', method: "GET",
  //   headers: headers()
  // })

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }

  return {} //await res.json()
}



// async function getDistricts() {

//   let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/district`, { cache: 'no-store' });

//   if (!response.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return await response.json();

// }


export default async function Page({ searchParams }: any) {
  const session: any = await getServerSession(authOptions);  

  if (session?.user?.passwordChanged == 0) {
    redirect('/auth/profile?message=Change your default password')

  }



  const dashboardData = await getDashboardData(searchParams)
  const regions = await getRegions(searchParams)
  // const districts = await getDistricts()



  let data = { session, dashboardData, regions }


  // return <Dashboard data={data} />
  return <>DASHBOARD</>
}
