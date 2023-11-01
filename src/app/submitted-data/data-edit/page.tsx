
import { SERVER_BASE_URL } from '@/config';
import DataEdit from '@/src/components/unused/submitted-data/DataEdit';
import { headers } from 'next/headers';

async function getSubmittedData(searchParams: any) {

    let { formId } = searchParams
    let { published } = searchParams
    let { id } = searchParams





    const res = await fetch(`${SERVER_BASE_URL}/api/submitted-data/data-edit?id=${id}&published=${published}&formId=${formId}`, { cache: 'no-store',headers: headers() })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function Page({ searchParams }: any) {
    const submittedData = await getSubmittedData(searchParams)



    
      const waterSupply = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/water-supply-type`
      ).then((res) => res.json());
    
      const waterSources = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/water-source-type`
      ).then((res) => res.json());
      const waterStorages = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/water-storage-type`
      ).then((res) => res.json());
    
      const waterTreatment = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/water-treatment-type`
      ).then((res) => res.json());
    
      const drinkingWaterSources = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/water-source-type`
      ).then((res) => res.json());
    
      const drainType = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/drain-type`
      ).then((res) => res.json());
    
      const effluentManagement = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/effluent-management`
      ).then((res) => res.json());
    
      const excretaContainment = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/excreta-containment`
      ).then((res) => res.json());
    
      const excretaDisposalMethod = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/excreta-disposal`
      ).then((res) => res.json());
    
      const greyWaterDisposal = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/grey-water-disposal`
      ).then((res) => res.json());
    
      const toiletType = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/toilet-type`
      ).then((res) => res.json());
    
      const wasteReceptacle = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/waste-storage-receptacle`
      ).then((res) => res.json());
    
      const unservicedWasteDisposal = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/unserviced-waste-disposal`
      ).then((res) => res.json());
    
      const nuisanceDetected = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/nuisance`
      ).then((res) => res.json());
    
      const action = await fetch(
        `${SERVER_BASE_URL}/api/primary-data/action`
      ).then((res) => res.json());
      ///////////////////////
      const waterSupplyOptions = waterSupply.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const waterSourcesOptions = waterSources.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const waterStoragesOptions = waterStorages.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const waterTreatmentOptions = waterTreatment.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const drinkingWaterSourcesOptions = drinkingWaterSources.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const drainTypeOptions = drainType.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const effluentManagementOptions = effluentManagement.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const excretaContainmentOptions = excretaContainment.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const excretaDisposalMethodOptions = excretaDisposalMethod.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const greyWaterDisposalOptions = greyWaterDisposal.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const toiletTypeOptions = toiletType.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const wasteReceptacleOptions = wasteReceptacle.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const unservicedWasteDisposalOptions = unservicedWasteDisposal.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const nuisanceDetectedOptions = nuisanceDetected.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });
      const actionOptions = action.map((data:any) => {
        return {
          value: data.id,
          label: data.name,
        };
      });



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



    let data = { submittedData: submittedData, waterSupplyOptions,
        waterSourcesOptions,
        waterStoragesOptions,
        waterTreatmentOptions,
        drinkingWaterSourcesOptions,
        drainTypeOptions,
        effluentManagementOptions,
        excretaContainmentOptions,
        excretaDisposalMethodOptions,
        greyWaterDisposalOptions,
        toiletTypeOptions,
        wasteReceptacleOptions,
        unservicedWasteDisposalOptions,
        nuisanceDetectedOptions,
        actionOptions, }



    return <DataEdit data={data} />


}

