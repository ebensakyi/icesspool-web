export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from '@/config';
import { ServicePoint } from '@/src/components/ServicePoint';
import { headers } from 'next/headers';


async function getServicePoints(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/configure/service-points?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }
  

  async function getServices(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/configure/services?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

  async function getServiceAreas(searchParams: any) {
    let { searchText } = searchParams;
  
    let { page } = searchParams;
  
    const res = await fetch(
      `${SERVER_BASE_URL}/api/configure/service-area?page=${page}&searchText=${searchText}`,
      { cache: "no-store", headers: headers() }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }
  
export default async function Page({ searchParams }: any) {
    const servicePoints = await getServicePoints(searchParams)
    const services = await getServices(searchParams)
    const serviceAreas = await getServiceAreas(searchParams)



    let data = { servicePoints, services,serviceAreas }



    return <ServicePoint data={data} />


}

