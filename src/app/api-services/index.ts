import { SERVER_BASE_URL } from "@/config";
import { headers } from "next/headers";

 async function getServices(searchParams: any) {
  let { searchText } = searchParams;

  let { page } = searchParams;

  const res = await fetch(
    `${SERVER_BASE_URL}/api/services?page=${page}&searchText=${searchText}`,
    { cache: "no-store", headers: headers() }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


 async function getBiodigesterServices(searchParams: any) {
  let { searchText } = searchParams;

  let { page } = searchParams;

  const res = await fetch(
    `${SERVER_BASE_URL}/api/services/biodigester?page=${page}&searchText=${searchText}`,
    { cache: "no-store", headers: headers() }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

 async function getServicePoints(searchParams: any) {
  let { searchText } = searchParams;

  let { page } = searchParams;

  const res = await fetch(
    `${SERVER_BASE_URL}/api/service-points?page=${page}&searchText=${searchText}`,
    { cache: "no-store", headers: headers() }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

 async function getRegions(searchParams: any) {
  let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

 async function getServiceAreas(searchParams: any) {
try {
   let response = await fetch(`${SERVER_BASE_URL}/api/service-area`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
} catch (error) {
  console.log("getServiceAreas==>",error);
  
}

 
}

 async function getTruckClasses(searchParams: any, service?: number) {
  let response = await fetch(
    `${SERVER_BASE_URL}/api/truck-classification?serviceId=${service}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}


 async function getEmptyingPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services/septic-tank/pricing?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

   async function getWaterPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services/water/pricing?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }


   async function getBiodigesterPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services/biodigester/pricing`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

   async function getTruckClassification(searchParams: any) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/truck-classification`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

   async function getServicesInAreas(searchParams: any) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services-in-area`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
  

   async function getUserTypes() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-type`, { cache: 'no-store', headers: headers() });
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


 async function getPages() {

  let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/pages`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
      throw new Error('Failed to fetch data')
  }
  return await response.json();

}


 async function getAdmins() {

  let response = await fetch(`${SERVER_BASE_URL}/api/user/admin`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
      throw new Error('Failed to fetch data')
  }
  return await response.json();

}


 async function getServiceProviders() {

  let response = await fetch(`${SERVER_BASE_URL}/api/user/service-provider`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
      throw new Error('Failed to fetch data')
  }
  return await response.json();

}

 async function getScanners() {

  let response = await fetch(`${SERVER_BASE_URL}/api/user/scanner`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
      throw new Error('Failed to fetch data')
  }
  return await response.json();

}
