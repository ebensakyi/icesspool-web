export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from '@/config';
import {  ServiceCharges } from '@/src/components/Charges';

import { headers } from 'next/headers';


async function getCharges(searchParams: any) {
    let { searchText } = searchParams;
  
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/configure/service-charges`,
      { cache: "no-store", headers: headers() }
    );    
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }


  async function getServiceAreas(searchParams: any) {
    let { searchText } = searchParams;
  
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/configure/service-area`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }
  
  async function getServices(searchParams: any) {
    let { searchText } = searchParams;
  
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/configure/services`,
      { cache: "no-store", headers: headers() }
    );


  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }
export default async function Page({ searchParams }: any) {
    const serviceCharges = await getCharges(searchParams)

    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)





    let data = { serviceCharges,services,serviceAreas }



    return <ServiceCharges data={data} />


}

