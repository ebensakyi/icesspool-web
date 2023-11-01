export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";

import SanitationReportList from "@/src/components/sanitation-report/SanitationReport";
import { headers } from "next/headers";
async function getSanitationReports(searchParams: any) {
    try {
        let { searchText } = searchParams
        let { page } = searchParams
        let { status } = searchParams

        
        let response = await fetch(`${SERVER_BASE_URL}/api/sanitation-report?page=${page}&searchText=${searchText}&status=${status}`, { cache: 'no-store', headers: headers() });

        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return response.json();
    } catch (error) {

    }


}

export default async function Page({ searchParams }: any) {


    const reports = await getSanitationReports(searchParams)



    let data = { reports }

    return <SanitationReportList data={data} />


}
