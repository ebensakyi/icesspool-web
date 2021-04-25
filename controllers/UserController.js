const { validationResult } = require("express-validator");

const { User } = require("../db/models");
const { Provider } = require("../db/models");
const { Client } = require("../db/models");
const { ActivationCode } = require("../db/models");
const { Location } = require("../db/models");
const { ProviderBalance } = require("../db/models/");
const { Vehicle } = require("../db/models/");
const { AxleClassification } = require("../db/models/");

const { Region } = require("../db/models/");
const { District } = require("../db/models/");

const Helper = require("../utils/Helper");
const gen = require("../utils/Generators");
const { ScannerUser } = require("../db/models");

const { TipoffPoint } = require("../db/models");
const { MomoAccount } = require("../db/models");
const { ProviderRating } = require("../db/models");

exports.createProvider = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(200)
        .send({ statusCode: 0, message: "Wrong input", data: errors.array() });
    }

    // const district = await District.findOne({ where: { districtName: req.body.district } })
    // const districtId = district.id

    const user = await User.create({
      surname: req.body.surname,
      otherNames: req.body.otherNames,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      fcm: req.body.fcm,
      password: req.body.password,
      userTypeId: 2,
    });

    await Location.create({ userId: user.id, regionId: req.body.region });
    await Vehicle.create({ userId: user.id });

    const providerId = await Helper.generateProviderCode(req.body.region);
    await Provider.create({
      id: providerId,
      userId: user.id,
      company: req.body.company,
    });

    await ProviderRating.create({ providerId: providerId });

    await MomoAccount.create({ providerId: providerId });

    await ProviderBalance.create({ providerId: providerId })
      .then((user) =>
        res
          .status(200)
          .send({ statusCode: 1, message: "User created", data: user })
      )
      .catch((error) =>
        res
          .status(400)
          .send({ statusCode: 0, message: "An error occured", data: error })
      );
  } catch (error) {
    console.log("createProvider", error);
  }
};

exports.createClient = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).send({ statusCode: 0, message: errors.array() });
    }

    // const error = 'Please provide complete details';
    // return res.status(400).json({ status: 'error', message: error });

    const user = await User.create({
      surname: req.body.surname,
      otherNames: req.body.otherNames,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      fcm: req.body.fcm,
      password: req.body.password,
      userTypeId: 3,
    });

    const client = await Client.create({
      id: Helper.generateClientCode(req.body.region),
      userId: user.id,
    });

    await Location.create({
      userId: user.id,
      regionId: req.body.region,
      // districtId: req.body.district,
    });

    const activationCode = await ActivationCode.create({
      code: gen.generateActivationCode(4),
      userId: user.id,
    });
    await Helper.sendSMS(
      user.phoneNumber,
      `Your activation code is ${activationCode.code}`
    );

    await Client.findOne({
      where: { id: client.id },
      include: [{ model: User }],
    })
      .then((user) =>
        res
          .status(200)
          .send({ statusCode: 1, message: "User created", data: user })
      )
      .catch((error) =>
        res.status(400).send({ statusCode: 0, message: error })
      );
  } catch (error) {
    console.log(error);

    res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.clientList = async (req, res) => {
  await Client.findAll({
    include: [
      {
        model: User,
      },
    ],
  })
    .then((user) =>
      res.status(200).send({ statusCode: 1, message: "Found", data: user })
    )
    .catch((error) => res.status(400).send({ statusCode: 1, message: error }));
};

exports.getAClient = async (req, res) => {
  if (!req.params.id) {
    const error = "Please provide user id";
    return res.status(400).send({ statusCode: 0, message: error });
  }

  await Client.findOne({
    where: {
      userId: req.params.id,
      deleted: 0,
    },
    include: [{ model: User }],
  })
    .then((user) => {
      if (user)
        return res
          .status(200)
          .send({ statusCode: 1, message: "Found", data: user });
      return res
        .status(200)
        .send({ statusCode: 0, message: "Not Found", data: user });
    })
    .catch((err) => res.status(400).send({ statusCode: 0, message: err }));
};

exports.updateClient = async (req, res) => {
  if (!req.params.id) {
    const error = "Please provide user id";
    return res.status(400).send({ statusCode: 0, message: error });
  }

  const client = await Client.findOne({
    where: { id: req.params.id },
    include: [{ model: User }],
  });

  await User.update(
    {
      surname: req.body.surname || client.surname,
      otherNames: req.body.otherNames || client.otherNames,
      email: req.body.email || client.email,
    },
    { where: { id: client.userId } }
  );

  await Client.findOne({
    where: { id: client.userId },
    include: [{ model: User }],
  })
    .then((user) =>
      res
        .status(200)
        .send({ statusCode: 1, message: "User updated", data: user })
    )
    .catch((error) => res.status(400).send({ statusCode: 0, message: error }));
};

exports.deleteClient = async (req, res) => {
  if (!req.params.id) {
    const error = "Please provide user id";
    return res.status(400).send({ statusCode: 0, message: error });
  }

  await Client.update({ deleted: 1 }, { where: { id: req.params.id } })
    .then((user) =>
      res
        .status(200)
        .send({ statusCode: 1, status: "User deleted", data: user })
    )
    .catch((error) => res.status(400).send({ statusCode: 0, message: error }));
};

exports.getAScanner = async (req, res) => {
  try {
    if (!req.params.id) {
      const error = "Please provide user id";
      return res.status(400).send({ statusCode: 0, message: error });
    }

    await ScannerUser.findOne({
      where: {
        userId: req.params.id,
        deleted: 0,
      },
      include: [{ model: User }, { model: TipoffPoint }],
    })
      .then((user) => {
        if (user)
          return res
            .status(200)
            .send({ statusCode: 1, message: "Found", data: user });
        return res
          .status(200)
          .send({ statusCode: 0, message: "Not Found", data: user });
      })
      .catch((err) => res.status(400).send({ statusCode: 0, message: err }));
  } catch (error) {
    return res.status(400).send({ statusCode: 0, message: error });
  }
};
