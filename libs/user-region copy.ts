import { prisma } from "@/prisma/db";

const getServiceAreaBoundaries = async () => {
  let boundaries = await prisma.serviceArea.findMany({
    where: {
      deleted: 0,
      status: 1,
    },
    select: {
      regionId:true,
      lat1: true,
      lat2: true,
      lat3: true,
      lat4: true,
      lng1: true,
      lng2: true,
      lng3: true,
      lng4: true,
    },
  });

  console.log(boundaries);

  let cityBoundaries = await prepareCityBoundaries(boundaries);

  console.log(cityBoundaries);
  

  //ACCRA POINT 5.601454,-0.169431

  return cityBoundaries;
};

const prepareCityBoundaries = async (coordinatesData: any) => {
  // for (let i = 0; i <= data.length; i++) {
  //   return [
  //     [Number(data[i].lat1), Number(data[i].lng1)],
  //     [Number(data[i].lat2), Number(data[i].lng2)],
  //     [Number(data[i].lat3), Number(data[i].lng3)],
  //     [Number(data[i].lat4), Number(data[i].lng4)],
  //   ];
  // }
  const formattedCoordinates = coordinatesData.map((data: { [x: string]: any; }) => {
    return Array.from({ length: 4 }, (_, i) => [data['lat' + (i + 1)], data['lng' + (i + 1)]]);
  });
  return formattedCoordinates
};

export const getUserRegion = async (userPoint: any) => {
  let polygons: any = await getServiceAreaBoundaries();

  const x = userPoint[0];
  const y = userPoint[1];
  let isInside = false;

  for (let i = 0, j = polygons.length - 1; i < polygons.length; j = i++) {

    const xi = polygons[i][0];
    const yi = polygons[i][1];
    const xj = polygons[j][0];
    const yj = polygons[j][1];

    console.log("xj==> ",xj);
    

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
};

// // Example coordinates for a polygon (New York, USA)
// const polygonCoordinates = [
//   [5.75545, -0.553617], // New York, NY
//   [6.136536, 0.233279], // Midtown Manhattan
//   [5.775945, 0.693331], // Financial District
//   [5.476644, -0.421781], // Battery Park
// ];

// // Example GPS coordinate
// const gpsCoordinateInside = [5.692594, -0.12927]; // Inside the polygon
// const gpsCoordinateOutside = [5.736321, -0.085324]; // Outside the polygon

// // Testing the example coordinates
// console.log(
//   isServiceAvailableInUserLocation(gpsCoordinateInside, polygonCoordinates)
// ); // Should print true
// console.log(
//   isServiceAvailableInUserLocation(gpsCoordinateOutside, polygonCoordinates)
// ); // Should print false
