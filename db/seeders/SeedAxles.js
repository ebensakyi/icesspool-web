const { AxleClassification } = require('../models')

exports.seedAxle = async () => {

    await AxleClassification.create({ id: 1, axleClass: "MINI", tankCapacity: 4.5 })
    await AxleClassification.create({ id: 2, axleClass: "SMALL", tankCapacity: 7.5 })
    await AxleClassification.create({ id: 3, axleClass: "SINGLE", tankCapacity: 12 })

}
