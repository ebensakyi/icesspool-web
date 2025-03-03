export const users = [
  {
    lastName: "John K.",
    firstName: "Doe",
    email: "",
    phoneNumber: "0543212322",
    userTypeId: 1,
    password: "$2a$12$81TbSB3HBu/NP/cRG6kDlu2sBcRz.4dq..3lpkcjklc.C/mCDxHaO",
    passwordChanged: 1,
  },
  {
    lastName: "Wusu",
    firstName: "Samuel",
    email: "",
    phoneNumber: "0540000000",
    passportPicture: "sp1.jpg",
    userTypeId: 3,
    password: "$2a$12$81TbSB3HBu/NP/cRG6kDlu2sBcRz.4dq..3lpkcjklc.C/mCDxHaO",
    passwordChanged: 1,
    serviceAreaId:1
   
  },

  {
    lastName: "Web",
    firstName: "Customer",
    email: "",
    phoneNumber: "0541111111",
    userTypeId: 4,
    password: "$2a$12$81TbSB3HBu/NP/cRG6kDlu2sBcRz.4dq..3lpkcjklc.C/mCDxHaO",
    passwordChanged: 1,
    serviceAreaId:1,
    activated: 1,

  },

  {
    lastName: "Play",
    firstName: "Store",
    email: "",
    phoneNumber: "0501111111",
    userTypeId: 4,
    password: "$2a$12$81TbSB3HBu/NP/cRG6kDlu2sBcRz.4dq..3lpkcjklc.C/mCDxHaO",
    passwordChanged: 1,
    serviceAreaId:1,
    activated: 1,

  },
];

// userId                Int      @unique
// idCardImg             String?  @db.VarChar(255)
// company               String?  @db.VarChar(255)
// officeLocation        String?  @db.VarChar(255)
// ghanaPostGPS          String?  @db.VarChar(255)
// licenseNumber         String?  @db.VarChar(255)
// licenseClassification Int?
// driversLicenseImg     String?  @db.VarChar(255)
