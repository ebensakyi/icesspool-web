import { SERVER_BASE_URL } from "@/config";
import { headers } from "next/headers";

export async function getServices(searchParams: any) {
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

export async function getServicePoints(searchParams: any) {
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

export async function getRegions(searchParams: any) {
  let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

export async function getServiceAreas(searchParams: any) {
  let response = await fetch(`${SERVER_BASE_URL}/api/service-area`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

export async function getTruckClasses(searchParams: any, service?: number) {
  let response = await fetch(
    `${SERVER_BASE_URL}/api/truck-classification?serviceId=${service}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}


export async function getDesludgingPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/pricing/desludging?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

  export async function getWaterPricing(searchParams: any, service?: number) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/pricing/water?serviceId=${service}`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }


  export async function getTruckClassification(searchParams: any) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/truck-classification`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

  export async function getServicesInAreas(searchParams: any) {
    let response = await fetch(
      `${SERVER_BASE_URL}/api/services-in-area`,
      { cache: "no-store" }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
  

  export async function getUserTypes() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-type`, { cache: 'no-store', headers: headers() });
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export async function getPages() {

  let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/pages`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
      throw new Error('Failed to fetch data')
  }
  return await response.json();

}


export async function getAdmins() {

  let response = await fetch(`${SERVER_BASE_URL}/api/user/admin`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
      throw new Error('Failed to fetch data')
  }
  return await response.json();

}

export async function getScanners() {

  let response = await fetch(`${SERVER_BASE_URL}/api/user/scanner`, { cache: 'no-store', headers: headers() });

  if (!response.ok) {
      throw new Error('Failed to fetch data')
  }
  return await response.json();

}
