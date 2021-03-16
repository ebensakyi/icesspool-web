const { IcesspoolBalance } = require('../models')

exports.seedBalance = async () => {
    await IcesspoolBalance.create({ id: 1, balance: 0 })
 

}
