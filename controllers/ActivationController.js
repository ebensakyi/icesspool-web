const { User } = require("../db/models");
const { ActivationCode } = require("../db/models");
const Helper = require("../utils/Helper");
const Generate = require("../utils/Generators");

exports.activateUser = async(req, res) => {
    const activationCode = await ActivationCode.findOne({
        where: { userId: req.body.userId, code: req.body.code },
    });
    if (!activationCode) {
        return res
            .status(200)
            .send({ statusCode: 300, message: "Activation code not found" });
    }
    // const client = await Client.findOne({ where: { id: req.body.userId } })

    await User.update({ activated: 1 }, { where: { id: req.body.userId } });

    await ActivationCode.destroy({
            where: { userId: req.body.userId, code: req.body.code },
        })
        .then((user) =>
            res
            .status(200)
            .send({ statusCode: 100, message: "User account activated" })
        )
        .catch((error) =>
            res.status(400).send({ statusCode: 400, message: error })
        );
};

exports.resendCode = async(req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.body.userId } });

        const activationCode = await ActivationCode.findOne({
            where: { userId: req.body.userId },
        });
        if (activationCode) {
            await Helper.sendSMS(
                user.phoneNumber,
                `Hello ${user.surname},\nWelcome to iCesspool. Your activation code is ${activationCode.code}`
            );
            return res.status(200).send({ statusCode: 1 });
        } else {
            const activationCode = await ActivationCode.create({
                code: Generate.generateActivationCode(4),
                userId: user.id,
            });
            await Helper.sendSMS(
                user.phoneNumber,
                `Hello ${user.surname},\nWelcome to iCesspool. Your activation code is ${activationCode.code}`
            );
            return res.status(200).send({ statusCode: 1 });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getActivationCodePage = async(req, res) => {
    try {
        let codes = await ActivationCode.findAll({
            include: [{ model: User }],
            order: [
                ["createdAt", "DESC"],
                // ["name", "ASC"],
            ],
        });
        // return res.send(codes)
        res.render("activation-code", { data: codes });
    } catch (error) {}
};