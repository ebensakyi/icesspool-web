export const dynamic = "force-dynamic";

import {  SERVER_BASE_URL } from "@/config";

import SMS from "@/src/components/messaging/SMS";
async function getSms() {

    let response = await fetch(`${SERVER_BASE_URL}/api/messaging/sms`, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getSendingType() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/sending-type`, { cache: 'no-store' });    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}
async function getUsers() {

    let response = await fetch(`${SERVER_BASE_URL}/api/user`, { cache: 'no-store' });    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getRegions() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/region`, { cache: 'no-store' });    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDistricts() {

    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/district`, { cache: 'no-store' });    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

export default async function Page() {
  

    const sms = await getSms()
    const sendingTypes = await getSendingType()
    const regions = await getRegions()
    const districts = await getDistricts()
    const users = await getUsers()

    let data = { sms, sendingTypes, regions, districts,users }  

    



    return <SMS data={data} />


}
