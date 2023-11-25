import axios from "axios";

export const getShortestDistanceBetweenUserServicePoint = (
  userLocation: any
) => {
  console.log("getShortestDistanceBetweenUserServicePoint ", userLocation);

  var options = {
    method: "POST",
    url: process.env.DISTANCE_MATRIX_API_URL,
    params: {
      travelMode: "DRIVING",
      unitSystem: "METRIC",
      origins: tipOffPoints.toString().replace("|,", "|"),
      destinations: `${userLocation[0]},${userLocation[1]}`,
      key: process.env. DISTANCE_MATRIX_API_KEY,
    },
    headers: { "content-type": "application/json" },
  };


  axios(options)
    .then(response => {
      console.log(response.status);
    });

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
