const { TamaleBalance } = require('../models')

exports.seedBalance = async () => {
    await TamaleBalance.create({ id: 1, balance: 0 })
 

}
