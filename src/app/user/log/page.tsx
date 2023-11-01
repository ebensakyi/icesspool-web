
import { LOGIN_URL, SERVER_BASE_URL } from "@/config";
import Log from "@/src/components/user/Log";
import { headers } from "next/headers";

async function getLogs(searchParams: any) {
    let { searchText } = searchParams
    let { page } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/user/log?page=${page}&searchText=${searchText}`,  { cache: 'no-store',headers: headers() });




    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}






export default async function Page({ searchParams }: any) {


    const logs = await getLogs(searchParams)

    let data = { logs }

    // console.log(data);




    return <Log data={data} />


}
