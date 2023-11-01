export const dynamic = "force-dynamic";

import {  SERVER_BASE_URL } from "@/config";
import OtherData from "@/src/components/primary-data/OtherData";
import { headers } from "next/headers";


async function getAction() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/action`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getAnimalType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/animal-type`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getCemeteryWorkers() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/cemetery-workers`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getCleaningFrequency() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/cleaning-frequency`,{ headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getCommunalContainerCondition() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/communal-container-condition`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getContainerVolume() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/container-volume`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDerattingFrequency() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/deratting-frequency`,);

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDesiltingFrequency() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/desilting-frequency`, );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDisinfectionFrequency() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/disinfection-frequency`,);

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDrainBadCondition() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/drain-bad-condition`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDrainType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/drain-type`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDrinkingWaterSourceType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/drinking-water-source-type`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getEaseYourselfWhere() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/ease-yourself-where`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getEffluentManagement() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/effluent-management`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getExcretaContainment() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/excreta-containment`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getExcretaDisposal() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/excreta-disposal`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getGreyWaterDisposal() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/grey-water-disposal`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getHazardousWasteDisposal() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/hazardous-waste-disposal`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

// async function getInspectionFormNuisances() {
//     let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/inspection-form-nuisances`,{ cache: 'no-store',headers: headers() } );

//     if (!response.ok) {
//         throw new Error('Failed to fetch data')
//     }
//     return await response.json();

// }

async function getNuisance() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/nuisance`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getOwnershipType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/ownership-type`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getPestSign() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/pest-sign`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getPremisesService() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/services`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getPremisesSubtypes() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/premises-subtypes`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getPremisesTypes() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/premises-types`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getRespondentDesignation() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/respondent-designation`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getSewerSystem() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/sewer-system`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getToiletHouseholdNumber() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/toilet-household-number`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getToiletPitPosition() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/toilet-pit-position`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getToiletType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/toilet-type`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getUnsafeToiletCondition() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/unsafe-toilet-condition`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getUnsafeWaterStorage() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/unsafe-water-storage`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getUnservicedWasteDisposal() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/unserviced-waste-disposal`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getWasteCollectionFrequency() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/waste-collection-frequency`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getWasteCollectionType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/waste-collection-type`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getWasteStorageReceptacle() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/waste-storage-receptacle`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getWasteWaterContainment() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/waste-water-containment`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getWaterFlowFrequency() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/water-flow-frequency`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getWaterSourceType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/water-source-type`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getWaterStorageType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/water-storage-type`, { cache: 'no-store',headers: headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getWaterSupplyType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/water-supply-type`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getWaterTreatmentType() {
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/water-treatment-type`,{ cache: 'no-store',headers: headers() } );

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}







export default async function Page() {

    const actions = await getAction() //1
    const animalTypes = await getAnimalType() //2

    const cemeteryWorkers = await getCemeteryWorkers() //3
    const cleaningFrequencies = await getCleaningFrequency()//4
    const communalContainerConditions = await getCommunalContainerCondition() //5
    const containerVolumes = await getContainerVolume() //6
    const derattingFrequencies = await getDerattingFrequency() //7
    const desiltingFrequencies = await getDesiltingFrequency() //8
    const disinfectionFrequencies = await getDisinfectionFrequency() //9
    const drainBadConditions = await getDrainBadCondition() //10
    const drainTypes = await getDrainType() //11
    const drinkingWaterSourceTypes = await getDrinkingWaterSourceType() //12
    const easeYourselfWheres = await getEaseYourselfWhere() //13
    const effluentManagements = await getEffluentManagement() //14
    const excretaContainments = await getExcretaContainment() //15
    const excretaDisposals = await getExcretaDisposal() //16
    const greyWaterDisposals = await getGreyWaterDisposal() //17
    const hazardousWasteDisposals = await getHazardousWasteDisposal() //18
    // const inspectionFormNuisances = await getInspectionFormNuisances() //19
    const nuisances = await getNuisance() //20

    const ownershipTypes = await getOwnershipType() //21
    const pestSigns = await getPestSign() //22
    const premisesServices = await getPremisesService() //23
    const premisesSubtypes = await getPremisesSubtypes() //24
    const premisesTypes = await getPremisesTypes() //25
    const respondentDesignations = await getRespondentDesignation() //26
    const sewerSystems = await getSewerSystem() //27
    const toiletHouseholdNumbers = await getToiletHouseholdNumber() //28
    const toiletPitPositions = await getToiletPitPosition() //29
    const toiletTypes = await getToiletType() //30
    const unsafeToiletConditions = await getUnsafeToiletCondition() //31
    const unsafeWaterStorages = await getUnsafeWaterStorage() //32
    const unservicedWasteDisposals = await getUnservicedWasteDisposal() //33
    const wasteCollectionFrequencies = await getWasteCollectionFrequency() //34
    const wasteCollectionTypes = await getWasteCollectionType() //35
    const wasteStorageReceptacles = await getWasteStorageReceptacle() //36
    const wasteWaterContainments = await getWasteWaterContainment() //37
    const waterFlowFrequencies = await getWaterFlowFrequency() //38
    const waterSourceTypes = await getWaterSourceType() //39
    const waterStorageTypes = await getWaterStorageType() //40
    const waterSupplyTypes = await getWaterSupplyType() //41
    const waterTreatmentTypes = await getWaterTreatmentType() //42


    let data = { actions, animalTypes, cemeteryWorkers, cleaningFrequencies, communalContainerConditions, containerVolumes, derattingFrequencies, desiltingFrequencies, disinfectionFrequencies, drainBadConditions, drainTypes, drinkingWaterSourceTypes, easeYourselfWheres, effluentManagements, excretaContainments, excretaDisposals, greyWaterDisposals, hazardousWasteDisposals, nuisances, ownershipTypes, pestSigns, premisesServices, premisesSubtypes, premisesTypes, respondentDesignations, sewerSystems, toiletHouseholdNumbers, toiletPitPositions, toiletTypes, unsafeToiletConditions, unsafeWaterStorages, unservicedWasteDisposals, wasteCollectionFrequencies, wasteCollectionTypes, wasteStorageReceptacles, wasteWaterContainments, waterFlowFrequencies, waterSourceTypes, waterStorageTypes, waterSupplyTypes, waterTreatmentTypes }





    return <OtherData data={data} />


}
