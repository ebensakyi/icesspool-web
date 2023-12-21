import { prisma } from "@/prisma/db";

const getServiceAreaBoundaries = async () => {
  let boundaries = await prisma.serviceArea.findMany({
    where: {
      deleted: 0,
      status: 1,
    },
    select: {id: true,
      regionId: true,
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


  const regions = boundaries.map((entry) => {
    const {id, regionId, lat1, lat2, lat3, lat4, lng1, lng2, lng3, lng4 } = entry;

    return {
      regionId,
      serviceAreaId:id,
      points: [
        { lat: Number(lat1), lng: Number(lng1) },
        { lat: Number(lat2), lng: Number(lng2) },
        { lat: Number(lat3), lng: Number(lng3) },
        { lat: Number(lat4), lng: Number(lng4) },
      ],
    };
  });
  console.log("regions ", regions[0]);

  // let cityBoundaries = await prepareCityBoundaries(boundaries);

  //ACCRA POINT 5.601454,-0.169431

  return regions;
};

// const prepareCityBoundaries = async (coordinatesData: any) => {
//   // for (let i = 0; i <= data.length; i++) {
//   //   return [
//   //     [Number(data[i].lat1), Number(data[i].lng1)],
//   //     [Number(data[i].lat2), Number(data[i].lng2)],
//   //     [Number(data[i].lat3), Number(data[i].lng3)],
//   //     [Number(data[i].lat4), Number(data[i].lng4)],
//   //   ];
//   // }
//   const formattedCoordinates = coordinatesData.map((data: { [x: string]: any; }) => {
//     return Array.from({ length: 4 }, (_, i) => [data['lat' + (i + 1)], data['lng' + (i + 1)]]);
//   });
//   return formattedCoordinates
// };

export const getUserRegion = async (userPoint: any) => {
  let polygons = await getServiceAreaBoundaries();
  //let whereIsUser = await isPointInsidePolygon(userPoint, polygons);
  // console.log("whereIsUseruserPointx==> ", userPoint);

  const foundRegion = polygons.find((region) =>
    isPointInsidePolygon(userPoint, region.points)
  );

  if (foundRegion) {
    // console.log(
    //   `The point is inside the region with regionId: ${foundRegion.regionId}`
    // );
    return foundRegion
  } else {
    //console.log("The point is not inside any region");
     return null
  }
};

const isPointInsidePolygon = (userPoint: any, polygon: any) => {
  const x = userPoint[0];
  const y = userPoint[1];

  let isInside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat;
    const yi = polygon[i].lng;
    const xj = polygon[j].lat;
    const yj = polygon[j].lng;


    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
};
