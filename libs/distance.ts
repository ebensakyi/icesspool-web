import { prisma } from "@/prisma/db";
import axios from "axios";

export const getShortestDistanceBtnUserServicePoint = async (
  userLocation: any
) => {
  console.log("getShortestDistanceBetweenUserServicePoint ", userLocation);

  let servicePoints = await prisma.servicePoint.findMany({
    where: {
      serviceId: 1,
      status: 1,
      deleted: 0,
    },
  });



  const options = {
    method: 'POST',
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
    params: {
      destinations: '40.659569,-73.933783|40.729029,-73.851524|40.6860072,-73.6334271|40.598566,-73.7527626',
      origins: '40.6655101,-73.89188969999998',
      key: 'AIzaSyCASoJIfdhowhu2y-abeSuidJSvgJZWebM'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });


//   const requestData = {
//     origins: ['New York,NY', 'Los Angeles,CA'],
//     destinations: ['San Francisco,CA', 'Seattle,WA'],
//     key: "AIzaSyCASoJIfdhowhu2y-abeSuidJSvgJZWebM",
//   };

  
//   async function makeGoogleMatrixApiRequest() {  

//     try {
//       const response = await axios.post('https://maps.googleapis.com/maps/api/distancematrix/json', requestData);
//       // Handle the response
//       console.log(response.data);
//     } catch (error) {
//       // Handle errors
//       console.error('Error making Google Matrix API request:', error);
//     }
//   }
  
//   // Call the async function
//   makeGoogleMatrixApiRequest();
  

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

  return 100;
};

const buildTipOffPoints = async (servicePoints: any) => {
    console.log("buildTipOffPoints==> ",servicePoints);
    
  let points: any = [];
  await servicePoints.map((point: any) => {
    points.push(point.lat, point.lng + "|");
  });
  return points;
};
