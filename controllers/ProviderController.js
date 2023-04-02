const { validationResult } = require("express-validator");

const { User, LicenseClasses } = require("../db/models");
const { Provider } = require("../db/models");
const {ProviderBalance} = require("../db/models")

const { MomoAccount } = require("../db/models");
const { Location } = require("../db/models");
const { Region } = require("../db/models");
const { District } = require("../db/models");
const { Vehicle } = require("../db/models");
const { AxleClassification } = require("../db/models");
const { MomoNetwork } = require("../db/models");
const { ProviderRating } = require("../db/models");
const Helper = require("../utils/Helper");

///////////////////////WEB/////////////////////

exports.addServiceProviderPage = async (req, res) => {
  await Helper.isLogin(req, res);
  const users = await User.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      userTypeId: 2,
    },
    include: [
      {
        model: Vehicle,
        include: [{ model: AxleClassification }],
      },
      {
        model: Location,
        include: [{ model: District, include: [{ model: Region }] }],
      },
      { model: Provider, include: [{ model: ProviderRating }] },
    ],
  });
  const momo = await MomoNetwork.findAll({ where: { deleted: 0 } });
  const licenseClasses = await LicenseClasses.findAll({
    where: { deleted: 0 },
  });
  const districts = await District.findAll({ where: { deleted: 0 } });

  const regions = await Region.findAll({ where: { deleted: 0 } });
  res.render("add-service-provider", {
    user: req.session.user,
    data: users,
    districts: districts,
    regions: regions,
    momo: momo,
    licenseClasses: licenseClasses,
  });
};

exports.addServiceProvider = async (req, res) => {
  try {
    console.log(req.body);
    // if (!req.params.id) {
    //   const error = "Please provide user id";
    //   return res.status(400).send({ statusCode: 0, message: error });
    // }
    let password = await generateRandom(8);
    const user = await User.create({
      surname: req.body.surname,
      otherNames: req.body.otherNames,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,

      password: password,
      userTypeId: 2,
    });

    let response = await Helper.sendSMS(
      req.body.phoneNumber,
      `Your service provider password is ${password}`
    );

    // const user = await User.findOne({
    //   where: { id: req.params.id },
    //   include: [{ model: Provider }],
    // });

    // let providerId = user.Provider.id;
    // const provider = await Provider.findOne({
    //   where: { id: providerId },
    //   include: [
    //     { model: User, include: [{ model: Location, model: Vehicle }] },
    //   ],
    // });

    // if (!provider)
    //   return res.status(400).json({ statusCode: 0, message: "User not found" });
    await Vehicle.create({
      axleClassificationId: req.body.axleClassification,
      vehicleNumber: req.body.vehicleNumber,
      owner: req.body.vehicleOwnerName,
      ownerNumber: req.body.vehicleOwnerPhoneNumber,
      tankCapacity: req.body.tankCapacity,
      insuranceExpiry: req.body.insuranceExpiry,
      insuranceNumber: req.body.insuranceNumber,
      userId: user.id,
    });
    const providerId = await Helper.generateProviderCode(req.body.region);

    await Provider.create({
      id: providerId,
      ghanaPostGPS: req.body.ghanaPostGps,
      company: req.body.companyName,
      officeLocation: req.body.officeLocation,
      driversLicense: req.body.driverLicense,
      licenseNumber: req.body.licenseNumber,
      licenseClassification: req.body.licenseClassification,
      userId: user.id,
    });

    await ProviderBalance.create({ providerId: providerId })
    await ProviderRating.create({ providerId: providerId });

    // const vehicle = await Vehicle.findOne({
    //   where: { userId: req.params.id },
    //   include: [{ model: AxleClassification }],
    // });

    // const location = await Location.findOne({
    //   where: { userId: req.params.id },
    // });
    await Location.create({
      regionId: req.body.region,
      districtId: req.body.district,
      community: req.body.community,
      userId: user.id,
    });

    await MomoAccount.create({
      momoNumber: req.body.momoNumber,
      momoNetwork: req.body.momoNetwork,
      providerId: providerId,
    });

    // await Provider.findOne({
    //   where: { id: providerId },
    //   include: [{ model: User, include: [{ model: Location }] }],
    // })
    //   .then((user) =>
    //     res
    //       .status(200)
    //       .send({ statusCode: 1, message: "User updated", data: user })
    //   )
    //   .catch((error) =>
    //     res.status(400).send({ statusCode: 0, message: error })
    //   );

         res
          .status(200)
          .send({ statusCode: 1, message: "User created", data: user })
      
  } catch (error) {
    await res.status(400).send({ statusCode: 0, message: error });
    console.log("Error>>> ", error);
  }
};

exports.newProviderPage = async (req, res) => {
  try {
    await Helper.isLogin(req, res);
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userTypeId: 2,
      },
      include: [
        {
          model: Vehicle,
          include: [{ model: AxleClassification }],
        },
        {
          model: Location,
          include: [{ model: District, include: [{ model: Region }] }],
        },
        { model: Provider, include: [{ model: ProviderRating }] },
      ],
    });
    const momo = await MomoNetwork.findAll({ where: { deleted: 0 } });
    const licenseClasses = await LicenseClasses.findAll({
      where: { deleted: 0 },
    });
    const districts = await District.findAll({ where: { deleted: 0 } });
    const regions = await Region.findAll({ where: { deleted: 0 } });

    res.render("providers", {
      user: req.session.user,
      data: users,
      districts: districts,
      regions: regions,
      momo: momo,
      licenseClasses: licenseClasses,
    });

    // res.send({
    //   data: users,
    //   districts: districts,
    //   regions: regions,
    //   momo: momo,
    //   licenseClasses: licenseClasses,
    // });
  } catch (error) {
    console.log(error);
  }
};

exports.existingProviderPage = async (req, res) => {
  res.render("existing-providers", { user: req.session.user });
};

exports.newProviderList = async (req, res) => {
  await User.findAll({
    where: {
      userTypeId: 2,
      activated: 0,
    },
    include: [
      {
        model: Provider,
      },
      { model: Location, include: [{ model: Region }, { model: District }] },
      { model: Vehicle, include: [{ model: AxleClassification }] },
    ],
  })
    .then((user) =>
      res.status(200).send({ statusCode: 1, message: "Found", data: user })
    )
    .catch((error) =>
      res.status(400).send({ statusCode: 0, message: "Error", data: error })
    );
};

exports.existingProviderList = async (req, res) => {
  await User.findAll({
    where: {
      userTypeId: 2,
    },
    include: [
      {
        model: Provider,
      },
      { model: Location, include: [{ model: Region }, { model: District }] },
      { model: Vehicle, include: [{ model: AxleClassification }] },
    ],
  })
    .then((user) =>
      res.status(200).send({ statusCode: 1, message: "Found", data: user })
    )
    .catch((error) =>
      res.status(400).send({ statusCode: 0, message: "Error", data: error })
    );
};

// exports.createProviderMomoDetails = async (req, res) => {
//     await MomoAccount.create({ providerId: req.body.providerId, momoNumber: req.body.momoNumber, momoNetwork: req.body.momoNetwork })
// }

exports.providerList = async (req, res) => {
  await User.findAll({
    where: {
      userTypeId: 2,
    },
    include: [
      {
        model: Provider,
      },
      { model: Location, include: [{ model: Region }, { model: District }] },
      { model: Vehicle, include: [{ model: AxleClassification }] },
    ],
  })
    .then((user) => {
      res.status(200).send({ statusCode: 1, message: "Found", data: user });
    })
    .catch((error) =>
      res.status(400).send({ statusCode: 0, message: "Error", data: error })
    );

  // await Provider.findAll({
  //     include: [{
  //         model: User,
  //        // include: [{ model: Location }]
  //     }],
  // }).then(user => res.status(200).send({ statusCode: 100, status: 'Found', data: user }))
  //     .catch(error => res.status(400).send(error));
};

exports.getWebProvider = async (req, res) => {
  try {
    if (!req.params.id) {
      const error = "Please provide user id";
      return res.status(400).send({ statusCode: 0, message: error });
    }

    const user = await User.findOne({
      where: {
        userTypeId: 2,
        id: req.params.id,
      },
      include: [
        {
          model: Vehicle,
          include: [{ model: AxleClassification }],
        },
        { model: Location, include: [{ model: Region }, { model: District }] },
        {
          model: Provider,
          include: [{ model: MomoAccount, include: [{ model: MomoNetwork }] }],
        },
      ],
    });

    //console.log(momo)

    return res.status(200).send({
      statusCode: 1,
      message: "Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProviderScannerApp = async (req, res) => {
  try {
    if (!req.params.id) {
      const error = "Please provide user id";
      return res.status(400).send({ statusCode: 0, message: error });
    }

    const provider = await Provider.findOne({
      where: {
        id: req.params.id,
      },
    });
    const user = await User.findOne({
      where: {
        userTypeId: 2,
        id: provider.userId,
      },
      include: [
        {
          model: Vehicle,
          include: [{ model: AxleClassification }],
        },
        { model: Location, include: [{ model: Region }, { model: District }] },
        {
          model: Provider,
          include: [{ model: MomoAccount, include: [{ model: MomoNetwork }] }],
        },
      ],
    });

    //console.log(momo)

    return res.status(200).send({
      statusCode: 1,
      message: "Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProviderClientApp = async (req, res) => {
  try {
    if (!req.params.id) {
      const error = "Please provide user id";
      return res.status(400).send({ statusCode: 0, message: error });
    }
    console.log(req.params);

    const provider = await Provider.findOne({
      where: {
        userId: Number(req.params.id),
      },
    });

    const user = await User.findOne({
      where: {
        userTypeId: 2,
        id: provider.userId,
      },
      include: [
        {
          model: Vehicle,
          include: [{ model: AxleClassification }],
        },
        { model: Location, include: [{ model: Region }, { model: District }] },
        {
          model: Provider,
          include: [{ model: MomoAccount, include: [{ model: MomoNetwork }] }],
        },
      ],
    });

    return res.status(200).send({
      statusCode: 1,
      message: "Found",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      statusCode: 0,
      message: error.message,
    });
  }
};

exports.deleteProvider = async (req, res) => {
  if (!req.params.id) {
    const error = "Please provide user id";
    return res.status(400).json({ status: "error", message: error });
  }

  await Provider.update({ deleted: 1 }, { where: { id: req.params.id } })
    .then((user) =>
      res
        .status(200)
        .send({ statusCode: 1, message: "User deleted", data: user })
    )
    .catch((error) => res.status(400).send({ statusCode: 0, message: error }));
};

exports.disableProviderAccount = async (req, res) => {
  let id = req.query.id;
  let status;

  const user = await User.findOne({ where: { id: id } });
  if (user.activated == 1) {
    status = -1;
  } else {
    status = 1;
  }

  await User.update({ activated: status }, { where: { id: id } });
  res.redirect("/providers");
};

exports.updateProvider = async (req, res) => {
  try {
    if (!req.params.id) {
      const error = "Please provide user id";
      return res.status(400).send({ statusCode: 0, message: error });
    }
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).send({ statusCode: 0, message: errors.array() });
    // }
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Provider }],
    });

    let providerId = user.Provider.id;
    const provider = await Provider.findOne({
      where: { id: providerId },
      include: [
        { model: User, include: [{ model: Location, model: Vehicle }] },
      ],
    });

    if (!provider)
      return res.status(400).json({ statusCode: 0, message: "User not found" });

    await Provider.update(
      {
        ghanaPostGPS: req.body.ghanaPostGps || provider.ghanaPostGPS,
        company: req.body.companyName || provider.company,
        officeLocation: req.body.officeLocation || provider.officeLocation,
        driversLicense: req.body.driversLicense || provider.driversLicense,
        licenseNumber: req.body.licenseNumber || provider.licenseNumber,
        licenseClassification:
          req.body.licenseClassification || provider.licenseClassification,
      },
      { where: { id: providerId } }
    );

    const vehicle = await Vehicle.findOne({
      where: { userId: req.params.id },
      include: [{ model: AxleClassification }],
    });

    await Vehicle.update(
      {
        axleClassificationId: req.body.axleClassification || vehicle.axleClass,
        vehicleNumber: req.body.vehicleNumber || vehicle.vehicleNumber,
        owner: req.body.vehicleOwnerName || vehicle.owner,
        ownerNumber: req.body.vehicleOwnerPhoneNumber || vehicle.ownerNumber,
        tankCapacity: req.body.tankCapacity || vehicle.tankCapacity,
        insuranceExpiry: req.body.insuranceExpiry || vehicle.insuranceExpiry,
        insuranceNumber: req.body.insuranceNumber || vehicle.insuranceNumber,
        //roadWorthy: req.body.roadWorthy || vehicle.roadWorthy,
        //roadWorthyExpiry: req.body.roadWorthyExpiry || vehicle.roadWorthyExpiry,
      },
      { where: { userId: vehicle.userId } }
    );

    const location = await Location.findOne({
      where: { userId: req.params.id },
    });
    await Location.update(
      {
        regionId: req.body.region || location.regionId,
        districtId: req.body.district || location.districtId,
        community: req.body.community || location.community,
      },
      { where: { userId: user.id } }
    );

    // const momo = await MomoAccount.findOne({
    //   where: { providerId: providerId },
    // });

    //let momoNumber = await req.body.momoNumber;
    // console.log("req.body.momoNumber ", req.body);

    await MomoAccount.update(
      {
        momoNumber: req.body.momoNumber,
        momoNetwork: req.body.momoNetwork,
      },
      { where: { providerId: providerId } }
    );

    await Provider.findOne({
      where: { id: providerId },
      include: [{ model: User, include: [{ model: Location }] }],
    })
      .then((user) =>
        res
          .status(200)
          .send({ statusCode: 1, message: "User updated", data: user })
      )
      .catch((error) =>
        res.status(400).send({ statusCode: 0, message: error })
      );
  } catch (error) {
    await res.status(400).send({ statusCode: 0, message: error });
    console.log("Error>>> ", error);
  }
};

exports.momoPage = async (req, res) => {
  const accounts = await MomoAccount.findAll({
    where: {
      deleted: 0,
    },
    include: [
      { model: MomoNetwork },
      {
        model: Provider,
        include: [{ model: User }],
      },
    ],
  });
  await res.render("momo-account", { data: accounts, user: req.session.user });
};

//Mobile
exports.setMomoAccount = async (req, res) => {
  try {
    const momo = await MomoAccount.create({
      providerId: req.body.providerId,
      momoNumber: req.body.momoNumber,
      momoNetwork: req.body.momoNetwork,
    });
    if (momo)
      return res
        .status(200)
        .send({ statusCode: 1, message: "MoMo account created", data: momo });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.changeProviderStatus = async (req, res) => {
  try {
    let id = req.query.id;
    let status = Math.abs(Number(req.query.status) - 1);

    await User.update({ activated: status }, { where: { id: id } });
    const user = await User.findOne({ where: { id: id } });

    if (user.activated == 1) {
      await Helper.sendSMS(
        user.phoneNumber,
        `Hello Mr. ${user.surname}, Your service account setup has been completed and activated successfully. Kindly login and check it out!`
      );
    }

    res.redirect("/providers");
  } catch (error) {
    console.log(error);
  }
};

generateRandom = async (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//+233209125718
//$2b$10$xUHFJWJD0psamTdDKr/ik.DG3A3Y.4eUbJSD8F5Mw8MPC9iRRngYC
