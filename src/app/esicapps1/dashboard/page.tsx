export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";
import Map from "@/src/components/map/Map";


// async function getData(searchParams: any) {
//     let { formId } = searchParams

//     let response = await fetch(`${SERVER_BASE_URL}/api/map?formId=${formId}`, { next: { revalidate: 14400 } });

//     if (!response.ok) {
//         throw new Error('Failed to fetch data')
//     }
//     return await response.json();

// }

export default async function Page({ searchParams }: any) {


    // const mapData = await getData(searchParams)


    // let data = { mapData }





    return   <main id="main" className="main">
    <div className="row">

        <div className="col-lg-12">
            <div className="col-sm-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title mb-0">ESICApps 1</h5>
                    </div>
                    <div className="card-body">

                    </div>
                </div>
            </div>
          
        </div>
    </div>
</main>
  


}
