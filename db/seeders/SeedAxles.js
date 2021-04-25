const { AxleClassification } = require('../models')

exports.seedAxle = async () => {

    await AxleClassification.create({ id: 1, axleClass: "SINGLE AXLE", tankCapacity: 12 })
    await AxleClassification.create({ id: 2, axleClass: "MEDIUM AXLE", tankCapacity: 16 })
    await AxleClassification.create({ id: 3, axleClass: "DOUBLE AXLE", tankCapacity: 20 })

}
