// export const isInCity=async(coordinates:any, cityCoordinates:any, cityRadiusKm:any)=> {
//   const distance = calculateDistance(coordinates, cityCoordinates);
//   return distance <= cityRadiusKm;
// }

// // Function to calculate distance between two coordinates using Haversine formula
// function calculateDistance(coord1:any, coord2:any) {
//   const R = 6371; // Earth radius in kilometers

//   const lat1 = toRadians(coord1[0]);
//   const lon1 = toRadians(coord1[1]);
//   const lat2 = toRadians(coord2[0]);
//   const lon2 = toRadians(coord2[1]);

//   const dLat = lat2 - lat1;
//   const dLon = lon2 - lon1;

//   const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const distance = R * c; // Distance in kilometers
//   return distance;
// }

// function toRadians(degrees:any) {
//   return degrees * (Math.PI / 180);
// }


// // // Example usage:
// // const cityCoordinates = [cityLatitude, cityLongitude];
// // const cityRadiusKm = 10; // Adjust this based on the radius you want to consider for the city

// // const gpsCoordinates = [gpsLatitude, gpsLongitude];

// // Example coordinates for a city (New York, USA)
// // const cityCoordinates = [40.7128, -74.006];

// // // Example GPS coordinates
// // const gpsCoordinatesInsideCity = [40.73061, -73.935242]; // Coordinates inside New York
// // const gpsCoordinatesOutsideCity = [34.052235, -118.243683]; // Coordinates outside New York

// // const cityRadiusKm = 10; // Adjust this based on the radius you want to consider for the city
// // let isIn = await isInCity(gpsCoordinatesInsideCity, cityCoordinates, cityRadiusKm)
// // if (isIn) {
// //   console.log("The GPS coordinates are within the specified city.");
// // } else {
// //   console.log("The GPS coordinates are outside the specified city.");
// // }
