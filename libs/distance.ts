import { prisma } from "@/prisma/db";
import axios from "axios";

export const getShortestDistanceBtnUserServicePoint = async (
  userLocation: any,
  serviceId: number,
  serviceAreaId: number
) => {
  let servicePoints = await prisma.servicePoint.findMany({
    where: {
      serviceId: serviceId,
      serviceAreaId: serviceAreaId,
      status: 1,
      deleted: 0,
    },
  });

  let latLngString = await convertToString(servicePoints);

  const options = {
    method: "POST",
    url: process.env.DISTANCE_MATRIX_API_URL,
    params: {
      destinations: latLngString,
      origins: `${userLocation[0]},${userLocation[1]}`,
      key: process.env.GOOGLE_API_KEY,
    },
  };

  //   axios
  //     .request(options)
  //     .then(function (response) {

  //       let distances:any = [];
  //             response.data.rows.map((d:any) => {
  //               let e = d.elements;
  //               if (e[0].status != "OK") {
  //                 return;
  //               }
  //               e.map((f:any) => {
  //                 distances.push(f.distance.value / 1000);
  //               });
  //             });
  //             console.log(distances);
  //             console.log(Math.min.apply(null, distances));

  //             //return resolve(Math.min.apply(null, distances));
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });

  const response = await axios.request(options);

  console.log(response);
  

  let distances: any = [];
  response.data.rows.map((d: any) => {
    let e = d.elements;
    if (e[0].status != "OK") {
      return;
    }
    e.map((f: any) => {
      distances.push(f.distance.value / 1000);
    });
  });

  //return resolve(Math.min.apply(null, distances));

  //   let processedServicePoints = await buildTipOffPoints(servicePoints)
  //   console.log("processedServicePoints<====> ",processedServicePoints);

  //   var options = {
  //     method: "POST",
  //     url: process.env.DISTANCE_MATRIX_API_URL,
  //     qs: {
  //       travelMode: "DRIVING",
  //       unitSystem: "METRIC",
  //       origins: processedServicePoints.toString().replace("|,", "|"),
  //       destinations: `${userLocation[0]},${userLocation[1]}`,
  //       key: process.env.DISTANCE_MATRIX_API_KEY,
  //     },
  //     headers: { "content-type": "application/json" },
  //   };

  //   axios(options).then((response) => {
  //     console.log(response.status);
  //   });

  //   return new Promise((resolve, reject) => {
  //     request(options, (error, response, body) => {
  //       if (error) return reject(error);
  //       const data = JSON.parse(body);
  //       console.log(JSON.stringify(data));

  //       let distances:any = [];
  //       data.rows.map((d:any) => {
  //         let e = d.elements;
  //         if (e[0].status != "OK") {
  //           return;
  //         }
  //         e.map((f:any) => {
  //           distances.push(f.distance.value / 1000);
  //         });
  //       });
  //       console.log(distances);

  //       return resolve(Math.min.apply(null, distances));
  //     });
  //   });

  return Math.min.apply(null, distances);
};

const convertToString = async (servicePoints: any) => {
  const latLngString = servicePoints
    .map((point: any) => `${point.latitude},${point.longitude}`)
    .join("|");

  return latLngString;
};
