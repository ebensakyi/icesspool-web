const { IcesspoolCommission } = require('../models')

exports.seedCommission = async () => {
    await IcesspoolCommission.create({ id: 1, commission: 0.18, status: 1 })
}
