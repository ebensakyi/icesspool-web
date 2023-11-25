import { prisma } from "@/prisma/db";

const getCityBoundaries = async () => {
  let boundaries = await prisma.serviceArea.findMany({
    where: {
      deleted: 0,
      status: 1,
    },
  });

  let cityBoundaries = await prepareCityBoundaries(boundaries);
  console.log(cityBoundaries);

  //ACCRA POINT 5.601454,-0.169431

  return cityBoundaries;
};

const prepareCityBoundaries = async (data: any) => {
  for (let i = 0; i <= data.length; i++) {
    return [
      [Number(data[i].lat1), Number(data[i].lng1)],
      [Number(data[i].lat2), Number(data[i].lng2)],
      [Number(data[i].lat3), Number(data[i].lng3)],
      [Number(data[i].lat4), Number(data[i].lng4)],
    ];
  }
};

export const isServiceAvailableInUserLocation = async (userPoint: any) => {
  let cityPolygon: any = await getCityBoundaries();

  const x = userPoint[0];
  const y = userPoint[1];
  let isInside = false;

  for (let i = 0, j = cityPolygon.length - 1; i < cityPolygon.length; j = i++) {
    const xi = cityPolygon[i][0];
    const yi = cityPolygon[i][1];
    const xj = cityPolygon[j][0];
    const yj = cityPolygon[j][1];

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
