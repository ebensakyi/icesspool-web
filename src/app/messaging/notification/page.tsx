export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/config";

 import Notification from "@/src/components/messaging/Notification";
// import dynamic from "next/dynamic";

// const Notification = dynamic(() => import('@/src/components/messaging/Notification'), {
//     ssr: false, // Prevent pre-rendering at build time
//   });
async function getNotifications() {

    let response = await fetch(`${SERVER_BASE_URL}/api/messaging/notification`, { cache: 'no-store' });

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


    const notifications = await getNotifications()
    const sendingTypes = await getSendingType()
    const regions = await getRegions()
    const districts = await getDistricts()
    const users = await getUsers()

    let data = {
        notifications, sendingTypes, regions, districts, users, fallback: false,
    }





    return <Notification data={data} />


}
