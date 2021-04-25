const { ScannerUser } = require("../models");
const { User } = require("../models");

exports.seedScannerUser = async () => {
  const user = await User.create({
    id: 3,
    surname: "Korle",
    otherNames: "Gono",
    email: "scanner@gmail.com",
    phoneNumber: "0501411801",
    password: "2020",
    userTypeId: 4,
    activated: 1,
  });
  await ScannerUser.create({ id:1, userId: user.id, tipoffPointId: 1 });
};
