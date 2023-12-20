// status      Int?          @default(1)
// deleted     Int?          @default(0)
// Service     Service       @relation(fields: [serviceId], references: [id])
// createdAt   DateTime      @default(now())
// updatedAt   DateTime      @updatedAt
// serviceId   Int

export const servicePoints = [
  {
    name: "Sewerage Systems",
    placeId: "ChIJ07NOXM6Q3w8RdRBmNdINhDk",
    address: "Korle Lagoon, Guggisberg Avenue, Accra, Ghana",
    location: "James Town",
    gps: "",
    lat: 5.5325481,
    lng: -0.218367,
    status: 1,
    serviceId: 1,
  },
  {
    name: "Accra Compost Recycle Plant, ACRP",
    placeId: "ChIJzfWERjoK3w8RH1QuggFUpqE",
    address: "Eastern Region, Ghana",
    location: "Adjen Kotoku",
    gps: "",
    lat: 5.756654,
    lng: -0.361391,
    status: 1,
    serviceId: 1,
  },
];
