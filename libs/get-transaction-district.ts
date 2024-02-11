import { prisma } from "@/prisma/db";


async function getDistrict(lat: number, lng: number): Promise<number> {
    try {
        // Fetch all district boundaries from the database
        const boundaries = await prisma.districtCoordinates.findMany();

        // Iterate over each district boundary
        for (const boundary of boundaries) {
            const districtId = boundary.districtId;
            const boundaryPoints:any = await prisma.districtCoordinates.findMany({
                where: { districtId },
                orderBy: { id: 'asc' } // Assuming the boundaries are ordered by id
            });

            // Check if the given coordinates fall within the boundary of the current district
            if (isWithinBoundary(lat, lng, boundaryPoints)) {
                return districtId; // Return the districtId if coordinates are within the boundary
            }
        }

        return -1; // Return -1 if coordinates do not fall within any district boundary
    } catch (error) {
        console.error('Error retrieving district boundaries:', error);
        throw error;
    } 
}

function isWithinBoundary(lat: number, lng: number, boundaryPoints: { latitude: number; longitude: number }[]): boolean {
    let inside = false;

    // Ray Casting algorithm
    for (let i = 0, j = boundaryPoints.length - 1; i < boundaryPoints.length; j = i++) {
        const xi = boundaryPoints[i].latitude;
        const yi = boundaryPoints[i].longitude;
        const xj = boundaryPoints[j].latitude;
        const yj = boundaryPoints[j].longitude;

        const intersect = ((yi > lng) !== (yj > lng)) &&
            (lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi);
        
        if (intersect) {
            inside = !inside;
        }
    }

    return inside;
}

// Example usage
const latitude = 5.575;
const longitude = -0.205;

getDistrict(latitude, longitude)
    .then(districtId => {
        console.log(`The coordinates (${latitude}, ${longitude}) fall into district ${districtId}.`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
