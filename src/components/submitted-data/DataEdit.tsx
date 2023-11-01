'use client'
import axios from 'axios';
import Link from 'next/link';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import EateryPremisesInfoView from './PremisesInfoViews/EateryPremisesInfoView';
import HealthPremisesInfoView from './PremisesInfoViews/HealthPremisesInfoView';
import HospitalityPremisesInfoView from './PremisesInfoViews/HospitalityPremisesInfoView';
import IndustryPremisesInfoView from './PremisesInfoViews/IndustryPremisesInfoView';
import InstitutionPremisesInfoView from './PremisesInfoViews/InstitutionPremisesInfoView';
import MarketPremisesInfoView from './PremisesInfoViews/MarketPremisesInfoView';
import ResidentialPremisesInfoView from './PremisesInfoViews/ResidentialPremisesInfoView';
import SanitaryPremisesInfoView from './PremisesInfoViews/SanitaryPremisesInfoView';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { LOGIN_URL } from '@/config';
import Multiselect from 'multiselect-react-dropdown';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

export default function DataEdit({ data }: any) {



    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })



    const [userId, setUserId] = useState();

    const [respondentName, setRespondentName] = useState();
    const [respondentPhoneNumber, setRespondentPhoneNumber] = useState("");

    const [animalPermitAvailability, setAnimalPermitAvailability] = useState();
    const [buildingPermitAvailability, setBuildingPermitAvailability] =
        useState();
    const [
        certificateHabitationAvailability,
        setCertificateHabitationAvailability,
    ] = useState();
    const [propertyRateAvailability, setPropertyRateAvailability] = useState();
    const [
        suitabilityCertificateAvailability,
        setSuitabilityCertificateAvailability,
    ] = useState();
    const [structurePermitAvailability, setStructurePermitAvailability] =
        useState();
    const [
        fumigationCertificateAvailability,
        setFumigationCertificateAvailability,
    ] = useState();
    const [businessPermitAvailability, setBusinessPermitAvailability] =
        useState();
    const [tempStructurePermitAvailability, setTempStructurePermitAvailability] =
        useState();
    const [waterAnalysisReportSafeUnsafe, setWaterAnalysisReportSafeUnsafe] =
        useState();
    const [regGeneralCertAvailability, setRegGeneralCertAvailability] =
        useState();
    const [gtaOperatingLicenceAvailability, setGtaOperatingLicenceAvailability] =
        useState();
    const [pharmacyCertAvailability, setPharmacyCertAvailability] = useState();
    const [waterSourceCondition, setWaterSourceCondition] = useState();
    const [waterStorageCondition, setWaterStorageCondition] = useState();
    const [toiletAdequacy, setToiletAdequacy] = useState();
    const [bathroomAdequacy, setBathroomAdequacy] = useState();
    const [toiletPitPosition, setToiletPitPosition] = useState();
    const [drainCondition, setDrainCondition] = useState();
    const [stagnationEvidence, setStagnationEvidence] = useState();
    const [analCleansingMaterialMgt, setAnalCleansingMaterialMgt] = useState();
    const [toiletCondition, setToiletCondition] = useState();
    const [toiletDischarge, setToiletDischarge] = useState();
    const [containmentEmptied, setContainmentEmptied] = useState();
    const [sewerSystem, setSewerSystem] = useState();
    const [easeYourselfWhere, setEaseYourselfWhere] = useState();
    const [desiltingFrequency, setDesiltingFrequency] = useState();
    const [
        wasteServiceProviderRegistration,
        setWasteServiceProviderRegistration,
    ] = useState();
    const [wasteSortingAvailability, setWasteSortingAvailability] = useState();
    const [
        wasteStorageReceptacleAvailability,
        setApprovedWasteStorageReceptacleAvailability,
    ] = useState();
    const [unservicedWasteDisposal, setUnservicedWasteDisposal] = useState();
    const [wastePaymentEvidence, setWastePaymentEvidence] = useState();
    const [containerVolume, setContainerVolume] = useState();
    const [wasteProviderAccreditted, setWasteProviderAccreditted] = useState();
    const [obnoxiousTradeExist, setObnoxiousTradeExist] = useState();
    const [adequateWasteStorageReceptacle, setAdequateWasteStorageReceptacle] =
        useState();
    const [numberToiletSeats, setNumberToiletSeats] = useState();
    // const [name, setName] = useState();
    // const [name, setName] = useState();

    const [selectedWaterSupply, setSelectedWaterSupply] = useState([]);
    const [selectedWaterSource, setSelectedWaterSource] = useState([]);
    const [selectedWaterStorage, setSelectedWaterStorage] = useState([]);

    const [selectedWaterTreatment, setSelectedWaterTreatment] = useState([]);
    const [selectedDrinkingWaterSource, setSelectedDrinkingWaterSource] =
        useState([]);
    const [selectedDrainType, setSelectedDrainType] = useState([]);
    const [waterFlowFrequency, setWaterFlowFrequency] = useState();
    const [selectedEffluentManagement, setSelectedEffluentManagement] = useState(
        []
    );
    const [selectedExcretaContainment, setSelectedExcretaContainment] = useState(
        []
    );
    const [selectedExcretaDisposalMethod, setSelectedExcretaDisposalMethod] =
        useState([]);

    const [selectedGreyWaterDisposal, setSelectedGreyWaterDisposal] = useState(
        []
    );
    const [selectedToiletType, setSelectedToiletType] = useState([]);
    const [selectedWasteReceptacle, setSelectedWasteReceptacle] = useState([]);

    const [selectedNuisanceDetected, setSelectedNuisanceDetected] = useState([]);
    const [selectedAction, setSelectedAction] = useState([]);
    const [selectedUnservicedWasteDisposal, setSelectedUnservicedWasteDisposal] =
        useState([]);

        const [selectedPremisesDrainBadCondition, setSelectedPremisesDrainBadCondition] =
        useState([]);

    const [numberUrinalSeats, setNumberUrinalSeats] = useState();
    const [wasteCollectorName, setWasteCollectorName] = useState();
    const [wasteCollectionType, setWasteCollectionType] = useState();
    const [officerComment, setOfficerComment] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [accuracy, setAccuracy] = useState();

    const [wasteServicePhoneNumber, setWasteServicePhoneNumber] = useState()
    const [wasteCollectionFrequency, setWasteCollectionFrequency] = useState()



    const router = useRouter();

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const formId = Number(searchParams.get("formId"))
    const published = Number(searchParams.get('published'))
    const page = Number(searchParams.get('page'))
    const searchtext = searchParams.get('searchText')

    const inspectionId = searchParams.get("id")



    useEffect(() => {
        setWasteServicePhoneNumber( data?.submittedData?.SolidWasteSection?.wasteServicePhoneNumber)
        setRespondentPhoneNumber(
          data?.submittedData?.BasicInfoSection?.respondentPhoneNumber
        );
        setRespondentName(data?.submittedData?.BasicInfoSection?.respondentName);
        setUserId(data?.submittedData?.User.id);
        setCertificateHabitationAvailability(
          data?.submittedData?.LicencePermitSection
            ?.habitationCertificateAvailability?.id
        );
        setAnimalPermitAvailability(
          data?.submittedData?.LicencePermitSection?.animalsPermitAvailability?.id
        );
    
        setBuildingPermitAvailability(
          data?.submittedData?.LicencePermitSection?.buildingPermitAvailability?.id
        );
    
        setPropertyRateAvailability(
          data?.submittedData?.LicencePermitSection?.propertyRateAvailability?.id
        );
    
        setSuitabilityCertificateAvailability(
          data?.submittedData?.LicencePermitSection
            ?.suitabilityCertificateAvailability?.id
        );
    
        setStructurePermitAvailability(
          data?.submittedData?.LicencePermitSection?.structurePermitAvailability?.id
        );
    
        setFumigationCertificateAvailability(
          data?.submittedData?.LicencePermitSection
            ?.fumigationCertificateAvailability?.id
        );
    
        setBusinessPermitAvailability(
          data?.submittedData?.LicencePermitSection?.businessLicenceAvailability?.id
        );
    
        setTempStructurePermitAvailability(
          data?.submittedData?.LicencePermitSection?.structurePermitAvailability?.id
        );
    
        setWaterAnalysisReportSafeUnsafe(
          data?.submittedData?.LicencePermitSection?.waterAnalysisReport?.id
        );
    
        setRegGeneralCertAvailability(
          data?.submittedData?.LicencePermitSection?.regGeneralCertAvailability?.id
        );
    
        setGtaOperatingLicenceAvailability(
          data?.submittedData?.LicencePermitSection?.gtaOperatingLicenceAvailability
            ?.id
        );
        setPharmacyCertAvailability(
          data?.submittedData?.LicencePermitSection?.pharmacyCertAvailability?.id
        );
    
        setWaterSourceCondition(
          data?.submittedData?.WaterSection?.waterSourceCondition?.id
        );
    
        setWaterStorageCondition(
          data?.submittedData?.WaterSection?.waterStorageConditionSafe?.id
        );
    
        setWaterFlowFrequency(
          data?.submittedData?.WaterSection?.WaterFlowFrequency?.id
        );
    
        setNumberToiletSeats(
          data?.submittedData?.LiquidWasteSection?.numberToiletSeats
        );
        setNumberUrinalSeats(
          data?.submittedData?.LiquidWasteSection?.numberUrinalSeats
        );
        setToiletAdequacy(
          data?.submittedData?.LiquidWasteSection?.toiletAdequacy?.id
        );
    
        setBathroomAdequacy(
          data?.submittedData?.LiquidWasteSection?.bathroomAdequacy?.id
        );
    
        setToiletPitPosition(
          data?.submittedData?.LiquidWasteSection?.toiletPitPosition?.id
        );
    
        setDrainCondition(
          data?.submittedData?.LiquidWasteSection?.drainsCondition?.id
        );
    
        setStagnationEvidence(
          data?.submittedData?.LiquidWasteSection?.stagnationEvidence?.id
        );
        setAnalCleansingMaterialMgt(
          data?.submittedData?.LiquidWasteSection?.analCleansingMaterialMgt?.id
        );
    
        setToiletCondition(
          data?.submittedData?.LiquidWasteSection?.toiletCondition?.id
        );
    
        setToiletDischarge(
          data?.submittedData?.LiquidWasteSection?.toiletDischarge?.id
        );
    
        setContainmentEmptied(
          data?.submittedData?.LiquidWasteSection?.containmentEmptied?.id
        );
    
        setSewerSystem(data?.submittedData?.LiquidWasteSection?.sewerSystem?.id);
        setEaseYourselfWhere(
          data?.submittedData?.LiquidWasteSection?.EaseYourselfWhere?.id
        );
    
        setDesiltingFrequency(
          data?.submittedData?.LiquidWasteSection?.DesiltingFrequency?.id
        );
    
        setWasteServiceProviderRegistration(
          data?.submittedData?.SolidWasteSection?.wasteServiceProviderRegistration
            ?.id
        );
    
        setWasteCollectorName(
          data?.submittedData?.SolidWasteSection?.wasteCollectorName
        );
    
        setWasteSortingAvailability(
          data?.submittedData?.SolidWasteSection?.wasteSortingAvailability?.id
        );
    
        setAdequateWasteStorageReceptacle(
          data?.submittedData?.SolidWasteSection?.approvedWasteStorageReceptacle?.id
        );
    
        setAdequateWasteStorageReceptacle(
          data?.submittedData?.SolidWasteSection?.adequateWasteStorageReceptacle?.id
        );
    
        setWasteCollectionType(
          data?.submittedData?.SolidWasteSection?.WasteCollectionType?.id
        );
    
        setUnservicedWasteDisposal(
          data?.submittedData?.SolidWasteSection?.UnservicedWasteDisposal?.id
        );
    
        setWastePaymentEvidence(
          data?.submittedData?.SolidWasteSection?.wastePaymentEvidence?.id
        );
    
        setContainerVolume(
          data?.submittedData?.SolidWasteSection?.ContainerVolume?.id
        );
    
        setWasteProviderAccreditted(
          data?.submittedData?.SolidWasteSection?.wasteProviderAccreditted?.id
        );
    
        setObnoxiousTradeExist(
          data?.submittedData?.ConclusionSection?.obnoxiousTradeExist?.id
        );
    
        setOfficerComment(data?.submittedData?.ConclusionSection?.officerComment);
    
        let premisesWaterSupply =
          data?.submittedData?.WaterSection?.PremisesWaterSupply?.map((data:any) => {
            return {
              value: data.WaterSupplyType.id,
              label: data.WaterSupplyType.name,
            };
          });
    
        setSelectedWaterSupply(premisesWaterSupply);
    
        let premisesWaterSource =
          data?.submittedData?.WaterSection?.PremisesWaterSources?.map((data:any) => {
            return {
              value: data.WaterSourceType.id,
              label: data.WaterSourceType.name,
            };
          });
    
        setSelectedWaterSource(premisesWaterSource);
    
        let premisesWaterTreatment =
          data?.submittedData?.WaterSection?.PremisesWaterTreatmentType?.map(
            (data:any) => {
              return {
                value: data.WaterTreatmentType.id,
                label: data.WaterTreatmentType.name,
              };
            }
          );
    
        setSelectedWaterTreatment(premisesWaterTreatment);
    
        let premisesDrinkingWaterSource =
          data?.submittedData?.WaterSection?.PremisesDrinkingWaterSources?.map(
            (data:any) => {
              return {
                value: data.DrinkingWaterSourceType.id,
                label: data.DrinkingWaterSourceType.name,
              };
            }
          );
    
        setSelectedDrinkingWaterSource(premisesDrinkingWaterSource);
    
        let premisesDrainType =
          data?.submittedData?.LiquidWasteSection?.PremisesDrainType?.map((data:any) => {
            return {
              value: data.DrainType.id,
              label: data.DrainType.name,
            };
          });

          
    
        setSelectedDrainType(premisesDrainType);
    
        let premisesEffluentManagement =
          data?.submittedData?.LiquidWasteSection?.PremisesEffluentManagement?.map(
            (data:any) => {
              return {
                value: data.EffluentManagement.id,
                label: data.EffluentManagement.name,
              };
            }
          );
    
        setSelectedEffluentManagement(premisesEffluentManagement);
    
        let premisesExcretaContainment =
          data?.submittedData?.LiquidWasteSection?.PremisesExcretaContainment?.map(
            (data:any) => {
              return {
                value: data.ExcretaContainment.id,
                label: data.ExcretaContainment.name,
              };
            }
          );
    
        setSelectedExcretaContainment(premisesExcretaContainment);
    
        let premisesGreyWaterDisposal =
          data?.submittedData?.LiquidWasteSection?.PremisesGreyWaterDisposal?.map(
            (data:any) => {
              return {
                value: data.GreyWaterDisposal.id,
                label: data.GreyWaterDisposal.name,
              };
            }
          );
    
        setSelectedGreyWaterDisposal(premisesGreyWaterDisposal);
    
        let premisesToiletType =
          data?.submittedData?.LiquidWasteSection?.PremisesToiletType?.map(
            (data:any) => {
              return {
                value: data.ToiletType.id,
                label: data.ToiletType.name,
              };
            }
          );
    
        setSelectedToiletType(premisesToiletType);
    
        let premisesWasteReceptacle =
          data?.submittedData?.SolidWasteSection?.PremisesWasteReceptacle?.map(
            (data:any) => {
              return {
                value: data.SolidWasteReceptacle.id,
                label: data.SolidWasteReceptacle.name,
              };
            }
          );
    
        setSelectedWasteReceptacle(premisesWasteReceptacle);
    
        let premisesUnservicedWasteDisposal =
          data?.submittedData?.SolidWasteSection?.PremisesUnservicedWasteDisposal?.map(
            (data:any) => {
              return {
                value: data.UnservicedWasteDisposal.id,
                label: data.UnservicedWasteDisposal.name,
              };
            }
          );
    
        setSelectedUnservicedWasteDisposal(premisesUnservicedWasteDisposal);
    
        let premisesActionTaken =
          data?.submittedData?.ConclusionSection?.PremisesActionTaken?.map(
            (data:any) => {
              return {
                value: data.Action.id,
                label: data.Action.name,
              };
            }
          );
    
        setSelectedAction(premisesActionTaken);
    
        let premisesNuisanceDetected =
          data?.submittedData?.ConclusionSection?.PremisesNuisanceDetected?.map(
            (data:any) => {
              return {
                value: data.Nuisance?.id,
                label: data.Nuisance?.name,
              };
            }
          );
    
        setSelectedNuisanceDetected(premisesNuisanceDetected);
    
        setAccuracy(data?.submittedData?.BasicInfoSection?.accuracy);
        setLatitude(data?.submittedData?.BasicInfoSection?.latitude);
        setLongitude(data?.submittedData?.BasicInfoSection?.longitude);
      }, []);

    const onWaterSupplyRemove = (selected: any) => {
        setSelectedWaterSupply(selected);
    };
    const onWaterSupplySelect = (selected: any) => {
        setSelectedWaterSupply(selected);
    };
    const onWaterStorageRemove = (selected: any) => {
        setSelectedWaterStorage(selected);
    };
    const onWaterStorageSelect = (selected: any) => {
        setSelectedWaterStorage(selected);
    };

    const onWaterSourcesRemove = (selected: any) => {
        setSelectedWaterSource(selected);
    };
    const onWaterSourcesSelect = (selected: any) => {
        setSelectedWaterSource(selected);
    };

    const onWaterTreatmentRemove = (selected: any) => {
        setSelectedWaterTreatment(selected);
    };
    const onWaterTreatmentSelect = (selected: any) => {
        setSelectedWaterTreatment(selected);
    };

    const onDrinkingWaterSourceRemove = (selected: any) => {
        setSelectedDrinkingWaterSource(selected);
    };
    const onDrinkingWaterSourceSelect = (selected: any) => {
        setSelectedDrinkingWaterSource(selected);
    };

    const onDrainTypeRemove = (selected: any) => {
        setSelectedDrainType(selected);
    };
    const onDrainTypeSelect = (selected: any) => {
        setSelectedDrainType(selected);
    };

    const onEffluentManagementRemove = (selected: any) => {
        setSelectedEffluentManagement(selected);
    };
    const onEffluentManagementSelect = (selected: any) => {
        setSelectedEffluentManagement(selected);
    };

    const onExcretaContainmentRemove = (selected: any) => {
        setSelectedExcretaContainment(selected);
    };
    const onExcretaContainmentSelect = (selected: any) => {
        setSelectedExcretaContainment(selected);
    };

    const onExcretaDisposalMethodRemove = (selected: any) => {
        setSelectedExcretaDisposalMethod(selected);
    };
    const onExcretaDisposalMethodSelect = (selected: any) => {
        setSelectedExcretaDisposalMethod(selected);
    };
    const onGreyWaterDisposalSelect = (selected: any) => {
        setSelectedGreyWaterDisposal(selected);
    };

    const onGreyWaterDisposalRemove = (selected: any) => {
        setSelectedGreyWaterDisposal(selected);
    };
    const onToiletTypeSelect = (selected: any) => {
        setSelectedToiletType(selected);
    };
    const onToiletTypeRemove = (selected: any) => {
        setSelectedToiletType(selected);
    };
    const onWasteReceptacleSelect = (selected: any) => {
        setSelectedWasteReceptacle(selected);
    };
    const onWasteReceptacleRemove = (selected: any) => {
        setSelectedWasteReceptacle(selected);
    };
    const onUnservicedWasteDisposalSelect = (selected: any) => {
        setSelectedUnservicedWasteDisposal(selected);
    };
    const onNuisanceDetectedSelect = (selected: any) => {
        setSelectedNuisanceDetected(selected);
    };
    const onNuisanceDetectedRemove = (selected: any) => {
        setSelectedNuisanceDetected(selected);
    };
    const onActionSelect = (selected: any) => {
        setSelectedAction(selected);
    };
    const onActionRemove = (selected: any) => {
        setSelectedAction(selected);
    };

    const handlePublish = async (id: any) => {
        try {
            const response = await axios.post(`/api/submitted-data/data-view`, {
                id: id,
            });
            if (response.status == 200) {

                router.push(
                    `/submitted-data?published=${published}&formId=${formId}`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id: any) => {

        try {
            const response = await axios.put(`/api/submitted-data/data-view`, {
                id: id,
            });
            if (response.status == 200) {
                router.push(
                    `/submitted-data?published=${published}&formId=${formId}`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpdate = async (id: any) => {
        try {
        
        let data = {
            inspectionId: inspectionId,
            inspectionFormId: formId,
            basicInfoSection: {
                latitude: latitude,
                longitude: longitude,
                accuracy: accuracy,
                respondentName: respondentName,
                respondentPhoneNumber: respondentPhoneNumber
            },

            waterSection: {
                waterSupply: selectedWaterSupply?.map((x: any) => x.value),
                waterSource: selectedWaterSource?.map((x: any) => x.value),
                waterStorage: selectedWaterStorage?.map((x: any) => x.value),
                waterTreatment: selectedWaterTreatment?.map((x: any) => x.value),
                drinkingWaterSource: selectedDrinkingWaterSource?.map((x: any) => x.value),
                waterSourceCondition: waterSourceCondition,
                waterStorageCondition: waterStorageCondition,
                waterFlowFrequency: waterFlowFrequency,
            },
            liquidWasteSection: {
                drainType: selectedDrainType?.map((x: any) => x.value),
                effluentManagement: selectedEffluentManagement?.map((x: any) => x.value),
                excretaContainment: selectedExcretaContainment?.map((x: any) => x.value),
                excretaDisposalMethod: selectedExcretaDisposalMethod?.map(
                    (x: any) => x.value
                ),
                greyWaterDisposal: selectedGreyWaterDisposal?.map((x: any) => x.value),
                toiletType: selectedToiletType?.map((x: any) => x.value),
                wasteReceptacle: selectedWasteReceptacle?.map((x: any) => x.value),
                numberToiletSeats: numberToiletSeats,
                numberUrinalSeats: numberUrinalSeats,
                toiletAdequacy: toiletAdequacy,
                bathroomAdequacy: bathroomAdequacy,
                toiletPitPosition: toiletPitPosition,
                drainCondition: drainCondition,
                stagnationEvidence: stagnationEvidence,
                analCleansingMaterialMgt: analCleansingMaterialMgt,
                toiletCondition: toiletCondition,
                toiletDischarge: toiletDischarge,
                containmentEmptied: containmentEmptied,
                sewerSystem: sewerSystem,
                easeYourselfWhere: easeYourselfWhere,
                desiltingFrequency: desiltingFrequency,

            },
            solidWasteSection: {
                wasteReceptacle: selectedWasteReceptacle?.map((x: any) => x.value),
                wasteServiceProviderRegistration: wasteServiceProviderRegistration,
                wasteCollectorName: wasteCollectorName,
                wasteServicePhoneNumber: wasteServicePhoneNumber,
                wasteSortingAvailability: wasteSortingAvailability,
                wasteStorageReceptacleAvailability: wasteStorageReceptacleAvailability,
                adequateWasteStorageReceptacle: adequateWasteStorageReceptacle,
                wasteCollectionType: wasteCollectionType,
                unservicedWasteDisposal: unservicedWasteDisposal,
                wastePaymentEvidence: wastePaymentEvidence,
                containerVolume: containerVolume,
                wasteProviderAccreditted: wasteProviderAccreditted,
                wasteCollectionFrequency: wasteCollectionFrequency
            },

            conclusionSection: {
                nuisanceDetected: selectedNuisanceDetected?.map((x: any) => x.value),
                action: selectedAction?.map((x: any) => x.value),
                obnoxiousTradeExist: obnoxiousTradeExist,
                officerComment: officerComment,
            },
            licencePermitSection: {
                animalPermitAvailability: animalPermitAvailability,
                buildingPermitAvailability: buildingPermitAvailability,
                habitationCertificateAvailability: certificateHabitationAvailability,
                propertyRateAvailability: propertyRateAvailability,
                suitabilityCertificateAvailability: suitabilityCertificateAvailability,
                structurePermitAvailability: structurePermitAvailability,
                fumigationCertificateAvailability: fumigationCertificateAvailability,
                businessPermitAvailability: businessPermitAvailability,
                waterAnalysisReportSafe: waterAnalysisReportSafeUnsafe,
                regGeneralCertAvailability: regGeneralCertAvailability,
                gtaOperatingLicenceAvailability: gtaOperatingLicenceAvailability,
                pharmacyCertAvailability: pharmacyCertAvailability,
            },
        };
  
        
       const response = await axios.put(`/api/submitted-data/data-edit`, data);

        if (response.status == 200) {
             toast.success("Data updated successfully");

            router.push(
                `/submitted-data?published=${published}&formId=${formId}`
            );
        }
        } catch (error) {
          console.log(error);
            
        }
       
      
    };




    const downloadInspection = async () => {
        // let printContents :any =  document.getElementById("printableArea").innerHTML ;
        // const originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        // window.print();
        // document.body.innerHTML = originalContents;
        router.refresh();
    };

    const handleTitle = () => {
        try {
            if (formId == 1) {
                return <h5 className="card-title mb-0">RESIDENTIAL PREMISES</h5>;
            } else if (formId == 2) {
                return <h5 className="card-title mb-0">EATING & DRINKING PREMISES</h5>;
            } else if (formId == 3) {
                return <h5 className="card-title mb-0">HEALTH PREMISES</h5>;
            } else if (formId == 4) {
                return <h5 className="card-title mb-0">HOSPITALITY PREMISES</h5>;
            } else if (formId == 5) {
                return <h5 className="card-title mb-0">INSTITUTION PREMISES</h5>;
            } else if (formId == 6) {
                return <h5 className="card-title mb-0">INDUSTRY PREMISES</h5>;
            } else if (formId == 7) {
                return (
                    <h5 className="card-title mb-0">MARKETS & LORRY PARK PREMISES</h5>
                );
            } else if (formId == 8) {
                return <h5 className="card-title mb-0">SANITARY FACILITY PREMISES</h5>;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(e: any) {
        e.preventDefault();
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>                                                       UPDATE DATA
                </h1>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Confirm deletion"
                >
                    <>


                     

                        <div className="alert alert-outline-danger alert-p" role="alert">
                            <span className="alert-content">
                            You are about to delete this inspection.<br/> Deleted inspection cannot be recovered.
                                Click OK to proceed to delete or Cancel to dismiss
                            </span>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-grid">
                                    <button
                                        onClick={(e) => {
                                            handleDelete(data?.submittedData?.id);
                                            closeModal();
                                        }}
                                        className="btn btn-success"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-grid">
                                    <button onClick={closeModal} className="btn btn-danger">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                </Modal>
                {/* <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">Tables</li>
                <li className="breadcrumb-item active">Data</li>
            </ol>
        </nav> */}
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-label waves-effect right waves-light rounded-pill"
                                    onClick={() => downloadInspection()}
                                >
                                    <i className="ri-file-pdf-line label-icon align-middle rounded-pill fs-16 ms-2"></i>{" "}
                                    Download Inspection
                                </button>
                            </div>
                        </div>
                        <div id="printableArea">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">{handleTitle()}</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link
                                            href="#"
                                                // href={{
                                                //     pathname: `/submitted-data/data`,
                                                //     query: {
                                                //         published: published,
                                                //         inspectionFormId: formId,
                                                //     },
                                                // }}
                                            >
                                                Go to Data list
                                            </Link>
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row mb-3">
                                        <div className="col-xl-12">
                                            <div className="row align-items-center gy-3 mb-3">
                                                <div className="col-sm">
                                                    <div>
                                                        <h5 className="fs-14 mb-0">
                                                            BASIC INFORMATION SECTION
                                                        </h5>
                                                    </div>
                                                </div>
                                                {/* <div className="col-sm-auto">
                  <a
                    href="apps-ecommerce-products.html"
                    className="link-primary text-decoration-underline"
                  >
                    Continue Shopping
                  </a>
                </div> */}
                                            </div>
                                            <div className="card ">
                                            <h5 className="card-title"></h5>

                                                <div className="card-body">
                                                    <div className="row gy-3">
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">Premises Code
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0"
                                                                value={data?.submittedData?.premisesCode}
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">Region</label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0"
                                                                value={
                                                                    data?.submittedData?.BasicInfoSection?.Community
                                                                        ?.District?.Region.name
                                                                }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">District</label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0"
                                                                value={
                                                                    data?.submittedData?.BasicInfoSection
                                                                        ?.Community != null
                                                                        ? data?.submittedData?.BasicInfoSection
                                                                            ?.Community?.District?.name
                                                                        : ""
                                                                }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                Electoral Area
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0"
                                                                value={data?.submittedData?.ElectoralArea?.name}
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">Community</label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0"
                                                                value={
                                                                    data?.submittedData?.BasicInfoSection?.Community
                                                                        ?.name
                                                                }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        {/* <div className="col-lg-3 col-sm-6">
                             <label htmlFor="inputText" className="col-sm-12 col-form-label">
                              GhanaPost GPS
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="invoicenoInput"
                              value={data?.submittedData?.BasicInfoSection?.ghanaPostGps}
                              
                            />
                          </div> */}
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                Name of respondent
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="invoicenoInput"
                                                                onChange={(e: any) =>
                                                                    setRespondentName(e.target.value)
                                                                }
                                                                value={respondentName}  
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                Respondent designation
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="invoicenoInput"
                                                                value={
                                                                    data?.submittedData?.BasicInfoSection
                                                                        ?.RespondentDesignation?.name
                                                                }
                                                                readOnly={true}
                                                            />
                                                        </div>{" "}
                                                        {data?.submittedData?.BasicInfoSection
                                                            ?.respondentPhoneNumber != "" ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Respondent phone number
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    onChange={(e: any) =>
                                                                        setRespondentPhoneNumber(e.target.value)
                                                                    }
                                                                    value={respondentPhoneNumber}
                                                                   
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}{" "}
                                                        {data?.submittedData?.BasicInfoSection?.latitude !=
                                                            "" ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">Latitude</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    onChange={(e: any) => setLatitude(e.target.value)}
                                                                    value={latitude}
                                                                // value={
                                                                //   data?.submittedData?.BasicInfoSection
                                                                //     ?.latitude
                                                                // }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}{" "}
                                                        {data?.submittedData?.BasicInfoSection?.longitude !=
                                                            "" ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">Longitude</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    onChange={(e: any) => setLongitude(e.target.value)}
                                                                    value={longitude}
                                                                // value={
                                                                //   data?.submittedData?.BasicInfoSection
                                                                //     ?.longitude
                                                                // }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}{" "}
                                                        {data?.submittedData?.BasicInfoSection?.accuracy !=
                                                            "" ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">Accuracy</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    onChange={(e: any) => setAccuracy(e.target.value)}
                                                                    value={accuracy}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                </div>
                            </div>

                            {/* {formId == 1 ? <ResidentialPremisesInfoEdit data={data?.submittedData} /> : <></>}
            {formId == 2 ? <EateryPremisesInfoEdit data={data?.submittedData} /> : <></>}
            {formId == 3 ? <HealthPremisesInfoEdit data={data?.submittedData} /> : <></>}
            {formId == 4 ? <HospitalityPremisesInfoEdit data={data?.submittedData} /> : <></>}
            {formId == 5 ? <InstitutionPremisesInfoEdit data={data?.submittedData} /> : <></>}
            {formId == 6 ? <IndustryPremisesInfoEdit data={data?.submittedData} /> : <></>}
            {formId == 7 ? <MarketPremisesInfoEdit data={data?.submittedData} /> : <></>}
            {formId == 8 ? <SanitaryPremisesInfoEdit data={data?.submittedData} /> : <></>} */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row mb-3">
                                        <div className="col-xl-12">
                                            <div className="row align-items-center gy-3 mb-3">
                                                <div className="col-sm">
                                                    <div>
                                                        <h5 className="fs-14 mb-0">
                                                            LICENCES & PERMITS SECTION
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card ">
                                            <h5 className="card-title"></h5>

                                                <div className="card-body">
                                                    <div className="row gy-3">
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.animalsPermitAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Animal permit availability
                                                                </label>

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setAnimalPermitAvailability(e.target.value);
                                                                    }}
                                                                    value={animalPermitAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.animalsPermitAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.buildingPermitAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Building permit availability
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setBuildingPermitAvailability(e.target.value);
                                                                    }}
                                                                    value={buildingPermitAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.buildingPermitAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.habitationCertificateAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Certificate of habitation avail.
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setCertificateHabitationAvailability(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={certificateHabitationAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.habitationCertificateAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.propertyRateAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Property rate payment availability
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setPropertyRateAvailability(e.target.value);
                                                                    }}
                                                                    value={propertyRateAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.propertyRateAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.suitabilityCertificateAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Suitability Certificate availability
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setSuitabilityCertificateAvailability(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={suitabilityCertificateAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.suitabilityCertificateAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.structurePermitAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Structure permit availability
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setStructurePermitAvailability(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={structurePermitAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.structurePermitAvailability.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.fumigationCertificateAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Fumigation certificate availability
                                                                </label>

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setFumigationCertificateAvailability(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={fumigationCertificateAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.fumigationCertificateAvailability.name
                                }
                                
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.businessLicenceAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Business operating permit availability
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setBusinessPermitAvailability(e.target.value);
                                                                    }}
                                                                    value={buildingPermitAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.businessLicenceAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.structurePermitAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Temporal structure permit availability
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setTempStructurePermitAvailability(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={tempStructurePermitAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.structurePermitAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.waterAnalysisReport != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water analysis report
                                                                </label>

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWaterAnalysisReportSafeUnsafe(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={waterAnalysisReportSafeUnsafe}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Safe</option>
                                                                    <option value={2}>Unsafe</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.waterAnalysisReport?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.regGeneralCertAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Registrar General operating certificate
                                                                </label>

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setRegGeneralCertAvailability(e.target.value);
                                                                    }}
                                                                    value={regGeneralCertAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.regGeneralCertAvailability.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.gtaOperatingLicenceAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Ghana Tourism Authority operating license
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setGtaOperatingLicenceAvailability(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={gtaOperatingLicenceAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>

                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.gtaOperatingLicenceAvailability?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        {data?.submittedData?.LicencePermitSection
                                                            ?.pharmacyCertAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    HEFRA/PHARMACY COUNCIL operating license
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setPharmacyCertAvailability(e.target.value);
                                                                    }}
                                                                    value={pharmacyCertAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>

                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LicencePermitSection
                                    ?.pharmacyCertAvailability?.value
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row mb-3">
                                        <div className="col-xl-12">
                                            <div className="row align-items-center gy-3 mb-3">
                                                <div className="col-sm">
                                                    <div>
                                                        <h5 className="fs-14 mb-0">WATER SECTION</h5>
                                                    </div>
                                                </div>
                                                {/* <div className="col-sm-auto">
                  <a
                    href="apps-ecommerce-products.html"
                    className="link-primary text-decoration-underline"
                  >
                    Continue Shopping
                  </a>
                </div> */}
                                            </div>
                                            <div className="card product">
                                            <h5 className="card-title"></h5>

                                                <div className="card-body">
                                                    <div className="row gy-3">
                                                        {data?.submittedData?.WaterSection
                                                            ?.PremisesWaterSources.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water source
                                                                </label>

                                                                <Multiselect
                                                                    options={data.waterSourcesOptions}
                                                                    selectedValues={selectedWaterSource}
                                                                    onSelect={onWaterSourcesSelect}
                                                                    onRemove={onWaterSourcesRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.WaterSection?.PremisesWaterSources.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.WaterSourceType.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.WaterSection
                                                            ?.PremisesWaterSupply.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water supply
                                                                </label>
                                                                {/* {data?.submittedData?.WaterSection?.PremisesWaterSupply.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.WaterSupplyType.name}
                                  />
                                )
                              )} */}
                                                                <Multiselect
                                                                    options={data.waterSupplyOptions}
                                                                    selectedValues={selectedWaterSupply}
                                                                    onSelect={onWaterSupplySelect}
                                                                    onRemove={onWaterSupplyRemove}
                                                                    displayValue="label"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.WaterSection
                                                            ?.waterSourceCondition != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water source condition
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWaterSourceCondition(e.target.value);
                                                                    }}
                                                                    value={waterSourceCondition}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Safe</option>
                                                                    <option value={2}>Unsafe</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.WaterSection?.waterSourceCondition?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        {data?.submittedData?.WaterSection
                                                            ?.PremisesWaterStorage.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water storage
                                                                </label>

                                                                <Multiselect
                                                                    options={data.waterStoragesOptions}
                                                                    selectedValues={selectedWaterStorage}
                                                                    onSelect={onWaterStorageSelect}
                                                                    onRemove={onWaterStorageRemove}
                                                                    displayValue="label"
                                                                />

                                                                {/* {data?.submittedData?.WaterSection?.PremisesWaterStorage.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.WaterStorageType.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.WaterSection
                                                            ?.waterStorageConditionSafe != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water storage receptacle condition
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWaterStorageCondition(e.target.value);
                                                                    }}
                                                                    value={waterStorageCondition}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Safe</option>
                                                                    <option value={2}>Unsafe</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.WaterSection?.waterStorageConditionSafe
                                    .name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.WaterSection
                                                            ?.PremisesWaterTreatmentType?.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water treatment type
                                                                </label>

                                                                <Multiselect
                                                                    options={data.waterTreatmentOptions}
                                                                    selectedValues={selectedWaterTreatment}
                                                                    onSelect={onWaterTreatmentSelect}
                                                                    onRemove={onWaterTreatmentRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.WaterSection?.PremisesWaterTreatmentType?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.WaterTreatmentType.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.WaterSection
                                                            ?.PremisesDrinkingWaterSources.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Drinking water source
                                                                </label>

                                                                <Multiselect
                                                                    options={data.drinkingWaterSourceOptions}
                                                                    selectedValues={selectedDrinkingWaterSource}
                                                                    onSelect={onDrinkingWaterSourceSelect}
                                                                    onRemove={onDrinkingWaterSourceRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.WaterSection?.PremisesDrinkingWaterSources?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.DrinkingWaterSourceType.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.WaterSection
                                                            ?.WaterFlowFrequency != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Water flow frequency
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWaterFlowFrequency(e.target.value);
                                                                    }}
                                                                    value={waterFlowFrequency}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Regular</option>
                                                                    <option value={2}>Intermittent</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.WaterSection
                                    ?.WaterFlowFrequency?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row mb-3">
                                        <div className="col-xl-12">
                                            <div className="row align-items-center gy-3 mb-3">
                                                <div className="col-sm">
                                                    <div>
                                                        <h5 className="fs-14 mb-0">LIQUID WASTE SECTION</h5>
                                                    </div>
                                                </div>
                                                {/* <div className="col-sm-auto">
                  <a
                    href="apps-ecommerce-products.html"
                    className="link-primary text-decoration-underline"
                  >
                    Continue Shopping


                  </a>
                </div> */}
                                            </div>
                                            <div className="card">
                                            <h5 className="card-title"></h5>

                                                <div className="card-body">
                                                    <div className="row gy-3">
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.numberToiletSeats != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Number Toilet Seats
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="valueInput"
                                                                    value={numberToiletSeats}
                                                                    onChange={(e: any) =>
                                                                        setNumberToiletSeats(e.target.value)
                                                                    }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.numberUrinalSeats != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Number Urinal Seats
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    value={numberUrinalSeats}
                                                                    onChange={(e:any) => {
                                                                        setNumberUrinalSeats(e?.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.toiletAdequacy != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Toilet Adequacy
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.toiletAdequacy?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setToiletAdequacy(e.target.value);
                                                                    }}
                                                                    value={toiletAdequacy}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Safe</option>
                                                                    <option value={2}>Unsafe</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.bathroomAdequacy != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Bathroom Adequacy
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.bathroomAdequacy
                                    ?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setBathroomAdequacy(e.target.value);
                                                                    }}
                                                                    value={bathroomAdequacy}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Safe</option>
                                                                    <option value={2}>Unsafe</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {/* {data?.submittedData?.LiquidWasteSection?.separateStaffUrinal != null ? (
                      <div className="col-lg-3 col-sm-6">
                         <label htmlFor="inputText" className="col-sm-12 col-form-label">
                          Separate Staff Urinal
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="invoicenoInput"
                          value={
                            data?.submittedData?.LiquidWasteSection?.separateStaffUrinal.name
                          }
                          
                        />
                      </div>
                    ) : (
                      <></>
                    )} */}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.toiletPitPosition != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Toilet Pit Position
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setToiletPitPosition(e.target.value);
                                                                    }}
                                                                    value={toiletPitPosition}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Direct</option>
                                                                    <option value={2}>Offsite</option>
                                                                    <option value={3}>NA</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.toiletPitPosition
                                    ?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.drainsCondition != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Drains Condition
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.drainsCondition
                                    ?.name
                                }
                              /> */}

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setDrainCondition(e.target.value);
                                                                    }}
                                                                    value={drainCondition}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Direct</option>
                                                                    <option value={2}>Offsite</option>
                                                                    <option value={3}>NA</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.stagnationEvidence != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Stagnation Evidence
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setStagnationEvidence(e.target.value);
                                                                    }}
                                                                    value={stagnationEvidence}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.stagnationEvidence
                                    ?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.analCleansingMaterialMgt != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Anal Cleansing Material Management
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setAnalCleansingMaterialMgt(e.target.value);
                                                                    }}
                                                                    value={analCleansingMaterialMgt}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection
                                    ?.analCleansingMaterialMgt?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.toiletCondition != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Toilet Condition
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setToiletCondition(e.target.value);
                                                                    }}
                                                                    value={toiletCondition}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Sanitary</option>
                                                                    <option value={2}>Insanitary</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.toiletCondition
                                    ?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.toiletDischarge != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Toilet Discharge
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.toiletDischarge
                                    ?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setToiletDischarge(e.target.value);
                                                                    }}
                                                                    value={toiletDischarge}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>On site</option>
                                                                    <option value={2}>Off site</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.containmentEmptied != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Containment Emptied
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setContainmentEmptied(e.target.value);
                                                                    }}
                                                                    value={containmentEmptied}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>On site</option>
                                                                    <option value={2}>Off site</option>
                                                                </select>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.containmentEmptied
                                    ?.name
                                }
                              /> */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.sewerSystem != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Sewer System
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.sewerSystem?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setSewerSystem(e.target.value);
                                                                    }}
                                                                    value={sewerSystem}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Centralised</option>
                                                                    <option value={2}>Decentralised</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.EaseYourselfWhere != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Ease Yourself Where
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.EaseYourselfWhere
                                    ?.name

                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setEaseYourselfWhere(e.target.value);
                                                                    }}
                                                                    value={easeYourselfWhere}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Neighbours place</option>
                                                                    <option value={2}>Bush</option>
                                                                    <option value={3}>Public toilet</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.DesiltingFrequency != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Desilting Frequency
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.LiquidWasteSection?.DesiltingFrequency
                                    ?.name
                                }

                              
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setDesiltingFrequency(e.target.value);
                                                                    }}
                                                                    value={desiltingFrequency}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Daily</option>
                                                                    <option value={2}>Weekly</option>
                                                                    <option value={3}>Monthly</option>
                                                                    <option value={4}>Quarterly</option>
                                                                    <option value={5}>Bi yearly</option>
                                                                    <option value={6}>Yearly</option>
                                                                    <option value={7}>None</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.PremisesDrainType?.length != 0 &&
                                                            data?.submittedData?.LiquidWasteSection
                                                                ?.PremisesDrainType?.length != undefined ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">Drain Type</label>
                                                                <Multiselect
                                                                    options={data.drainTypeOptions}
                                                                    selectedValues={selectedDrainType}
                                                                    onSelect={onDrainTypeSelect}
                                                                    onRemove={onDrainTypeRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.LiquidWasteSection?.PremisesDrainType?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.DrainType?.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.PremisesEffluentManagement?.length != 0 &&
                                                            data?.submittedData?.LiquidWasteSection
                                                                ?.PremisesEffluentManagement?.length !=
                                                            undefined ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Effluent Management
                                                                </label>
                                                                <Multiselect
                                                                    options={data.effluentManagementOptions}
                                                                    selectedValues={selectedEffluentManagement}
                                                                    onSelect={onEffluentManagementSelect}
                                                                    onRemove={onEffluentManagementRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.LiquidWasteSection?.PremisesEffluentManagement?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.EffluentManagement.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.PremisesExcretaContainment?.length != 0 &&
                                                            data?.submittedData?.LiquidWasteSection
                                                                ?.PremisesExcretaContainment?.length !=
                                                            undefined ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Excreta Containment
                                                                </label>
                                                                <Multiselect
                                                                    options={data.excretaContainmentOptions}
                                                                    selectedValues={selectedExcretaContainment}
                                                                    onSelect={onExcretaContainmentSelect}
                                                                    onRemove={onExcretaContainmentRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.LiquidWasteSection?.PremisesExcretaContainment.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.ExcretaContainment.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.PremisesExcretaDisposalMethod?.length != 0 &&
                                                            data?.submittedData?.LiquidWasteSection
                                                                ?.PremisesExcretaDisposalMethod?.length !=
                                                            undefined ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Excreta Disposal Method
                                                                </label>
                                                                <Multiselect
                                                                    options={data.excretaDisposalMethodOptions}
                                                                    selectedValues={selectedExcretaDisposalMethod}
                                                                    onSelect={onExcretaDisposalMethodSelect}
                                                                    onRemove={onExcretaDisposalMethodRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.LiquidWasteSection?.PremisesExcretaDisposalMethod?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.ExcretaDisposalMethod.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.PremisesGreyWaterDisposal?.length != 0 &&
                                                            data?.submittedData?.LiquidWasteSection
                                                                ?.PremisesGreyWaterDisposal?.length != undefined ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Grey Water Disposal
                                                                </label>
                                                                <Multiselect
                                                                    options={data.greyWaterDisposalOptions}
                                                                    selectedValues={selectedGreyWaterDisposal}
                                                                    onSelect={onGreyWaterDisposalSelect}
                                                                    onRemove={onGreyWaterDisposalRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.LiquidWasteSection?.PremisesGreyWaterDisposal?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.GreyWaterDisposal.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.LiquidWasteSection
                                                            ?.PremisesToiletType?.length != 0 &&
                                                            data?.submittedData?.LiquidWasteSection
                                                                ?.PremisesToiletType?.length != undefined ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Toilet Type
                                                                </label>
                                                                {/* {data?.submittedData?.LiquidWasteSection?.PremisesToiletType?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.ToiletType.name}
                                  />
                                )
                              )} */}
                                                                <Multiselect
                                                                    options={data.toiletTypeOptions}
                                                                    selectedValues={selectedToiletType}
                                                                    onSelect={onToiletTypeSelect}
                                                                    onRemove={onToiletTypeRemove}
                                                                    displayValue="label"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row mb-3">
                                        <div className="col-xl-12">
                                            <div className="row align-items-center gy-3 mb-3">
                                                <div className="col-sm">
                                                    <div>
                                                        <h5 className="fs-14 mb-0">SOLID WASTE SECTION</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card product">
                                            <h5 className="card-title"></h5>

                                                <div className="card-body">
                                                    <div className="row gy-3">
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.wasteServiceProviderRegistration != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Service Provider Registration
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection
                                    ?.wasteServiceProviderRegistration?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWasteServiceProviderRegistration(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={wasteServiceProviderRegistration}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.wasteCollectorName != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Collector Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    value={wasteCollectorName}
                                                                    onChange={(e: any) => {
                                                                        setWasteCollectorName(e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}


                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.wasteServicePhoneNumber != "" ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Collector Phone
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    value={wasteServicePhoneNumber}
                                                                    onChange={(e: any) => {
                                                                        setWasteServicePhoneNumber(e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.wasteCollectionFrequency != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Collection Frequency
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection
                                    ?.wasteSortingAvailability?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWasteCollectionFrequency(e.target.value);
                                                                    }}
                                                                    value={wasteCollectionFrequency}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Daily</option>
                                                                    <option value={2}>Weekly</option>
                                                                    <option value={3}>Forthnightly</option>
                                                                    <option value={4}>Monthly</option>
                                                                    <option value={5}>Intermittent</option>

                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.wasteSortingAvailability != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Sorting Availability
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection
                                    ?.wasteSortingAvailability?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWasteSortingAvailability(e.target.value);
                                                                    }}
                                                                    value={wasteSortingAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.approvedWasteStorageReceptacle != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Approved Waste Storage Receptacle
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection
                                    ?.approvedWasteStorageReceptacle?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setApprovedWasteStorageReceptacleAvailability(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={wasteStorageReceptacleAvailability}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.adequateWasteStorageReceptacle != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Adequate Waste Storage Receptacle
                                                                </label>

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setAdequateWasteStorageReceptacle(
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                    value={adequateWasteStorageReceptacle}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.WasteCollectionType != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Collection Type
                                                                </label>

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWasteCollectionType(e.target.value);
                                                                    }}
                                                                    value={wasteCollectionType}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Communal container</option>
                                                                    <option value={2}>Door to door</option>
                                                                    <option value={3}>Not serviced</option>
                                                                    <option value={4}>Communal Dump Site</option>
                                                                </select>
                                                                {/* {data?.submittedData?.SolidWasteSection?.PremisesWasteCollection?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x.WasteCollectionType.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.PremisesWasteReceptacle?.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Collection Receptacle
                                                                </label>
                                                                {/* {data?.submittedData?.SolidWasteSection?.PremisesWasteReceptacle?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x?.SolidWasteReceptacle?.name}
                                  />
                                )
                              )} */}

                                                                <Multiselect
                                                                    options={data.wasteReceptacleOptions}
                                                                    selectedValues={selectedWasteReceptacle}
                                                                    onSelect={onWasteReceptacleSelect}
                                                                    onRemove={onWasteReceptacleRemove}
                                                                    displayValue="label"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.UnservicedWasteDisposal != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Unserviced Waste Disposal
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection
                                    ?.UnservicedWasteDisposal?.name
                                }
                              /> */}

                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setUnservicedWasteDisposal(e.target.value);
                                                                    }}
                                                                    value={unservicedWasteDisposal}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Crude Dumping</option>
                                                                    <option value={2}>Burning</option>
                                                                    <option value={2}>Burying</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.wastePaymentEvidence != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Payment Evidence
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection?.wastePaymentEvidence
                                    ?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWastePaymentEvidence(e.target.value);
                                                                    }}
                                                                    value={wastePaymentEvidence}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.ContainerVolume != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Container Volume
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection?.ContainerVolume?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setContainerVolume(e.target.value);
                                                                    }}
                                                                    value={containerVolume}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>10 Cubic</option>
                                                                    <option value={2}>12 Cubic</option>
                                                                    <option value={3}>14 Cubic</option>
                                                                    <option value={4}>20 and Above</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.SolidWasteSection
                                                            ?.wasteProviderAccreditted != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Waste Provider Accreditted
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.SolidWasteSection
                                    ?.wasteProviderAccreditted?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setWasteProviderAccreditted(e.target.value);
                                                                    }}
                                                                    value={wasteProviderAccreditted}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row mb-3">
                                        <div className="col-xl-12">
                                            <div className="row align-items-center gy-3 mb-3">
                                                <div className="col-sm">
                                                    <div>
                                                        <h5 className="fs-14 mb-0">
                                                            ACTIONS & CONCLUSION SECTION
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card product">
                                            <h5 className="card-title"></h5>

                                                <div className="card-body">
                                                    <div className="row gy-3">
                                                        {data?.submittedData?.ConclusionSection
                                                            ?.obnoxiousTradeExist != null ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Obnoxious Trade Exist
                                                                </label>
                                                                {/* <input
                                type="text"
                                className="form-control"
                                id="invoicenoInput"
                                value={
                                  data?.submittedData?.ConclusionSection?.obnoxiousTradeExist
                                    ?.name
                                }
                              /> */}
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    onChange={(e: any) => {
                                                                        setObnoxiousTradeExist(e.target.value);
                                                                    }}
                                                                    value={obnoxiousTradeExist}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value={1}>Yes</option>
                                                                    <option value={2}>No</option>
                                                                </select>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.ConclusionSection
                                                            ?.PremisesNuisanceDetected?.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Nuisance Observed
                                                                </label>

                                                                <Multiselect
                                                                    options={data.nuisanceDetectedOptions}
                                                                    selectedValues={selectedNuisanceDetected}
                                                                    onSelect={onNuisanceDetectedSelect}
                                                                    onRemove={onNuisanceDetectedRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.ConclusionSection?.PremisesNuisanceDetected?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x?.Nuisance?.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.ConclusionSection
                                                            ?.officerComment != "" ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Office Comment
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="invoicenoInput"
                                                                    value={officerComment}
                                                                    onChange={(e: any) => {
                                                                        setOfficerComment(e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {data?.submittedData?.ConclusionSection
                                                            ?.PremisesActionTaken?.length != 0 ? (
                                                            <div className="col-lg-3 col-sm-6">
                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                    Action Taken
                                                                </label>
                                                                <Multiselect
                                                                    options={data.actionOptions}
                                                                    selectedValues={selectedAction}
                                                                    onSelect={onActionSelect}
                                                                    onRemove={onActionRemove}
                                                                    displayValue="label"
                                                                />
                                                                {/* {data?.submittedData?.ConclusionSection?.PremisesActionTaken?.map(
                                (x) => (
                                  <input
                                    key={x.id}
                                    type="text"
                                    className="form-control"
                                    id="invoicenoInput"
                                    value={x?.Action?.name}
                                  />
                                )
                              )} */}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                            Reporting Officer
                                                        </label>
                                                        <input
                                                            disabled={true}
                                                            type="text"
                                                            className="form-control"
                                                            id="invoicenoInput"
                                                            value={`${data?.submittedData?.User?.otherNames} ${data?.submittedData?.User?.surname}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {data?.submittedData?.InspectionPictures.map((ip) => {
     return <figure className="figure">
        <img
          src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${ip}`}
          className="figure-img img-fluid rounded"
          alt="..."
        />
        <figcaption className="figure-caption">
          A caption for the above image.
        </figcaption>
      </figure>
         })} */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row mb-3">
                                        <div className="col-xl-12">
                                            {/* <div className="row align-items-center gy-3 mb-3">
                                                <div className="col-sm">
                                                    <div>
                                                        <h5 className="fs-14 mb-0">PICTURES</h5>
                                                    </div>
                                                </div>
                                            </div> 
                                            
                                            <div className="row gallery-wrapper">
                      {data?.submittedData?.InspectionPictures?.map((ip) => {
                        return (
                          <div
                            key={ip.id}
                            className="element-item col-xxl-3 col-xl-4 col-sm-6 project designing development"
                            data-category="designing development"
                          >
                            <div className="gallery-box card">
                              <div className="gallery-container">
                                <a
                                  className="image-popup"
                                  href={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${ip.imagePath}`}
                                  title=""
                                >
                                  <img
                                    className="gallery-img img-fluid mx-auto"
                                    src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${ip.imagePath}`}
                                    alt=""
                                  />
                                  <div className="gallery-overlay">
                                    <h5 className="overlay-caption">
                                      {ip.FormSectionImage.name}
                                    </h5>
                                  </div>
                                </a>
                              </div>

                              <div className="box-content">
                                <div className="d-flex align-items-center mt-1">
                                  <div className="flex-grow-1 text-muted">
                                    <a
                                      href=""
                                      className="text-body text-truncate"
                                    >
                                      {ip.FormSectionImage.name}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div> */}
                                        </div>
                                        <div className="col-sm-auto">
                                            {data?.submittedData?.isPublished == 0 ? (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={(e: any) => {
                                                        e.preventDefault();

                                                        handlePublish(data?.submittedData?.id);
                                                    }}
                                                >
                                                    Publish
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e: any) => {
                                                        e.preventDefault();

                                                        handlePublish(data?.submittedData?.id);
                                                    }}
                                                >
                                                    Unpublish
                                                </button>
                                            )}
                                        </div>
                                        <div className="col-sm-auto">
                                            <button
                                                className="btn btn-primary"
                                                onClick={(e: any) => {
                                                    e.preventDefault();

                                                    handleUpdate(data?.submittedData?.id);
                                                }}
                                            >
                                                Update
                                            </button>
                                        </div>

                                        <div className="col-sm-auto">
                                            {data?.submittedData?.isPublished == 0 ? (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e: any) => {
                                                        e.preventDefault();

                                                        handleDelete(data?.submittedData?.id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    )
}
