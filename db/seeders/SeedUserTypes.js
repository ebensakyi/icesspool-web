const { UserType } = require('../models')

exports.seedUserType = async () => {
    await UserType.create({ id: 1, title: 'Administrator' })
    await UserType.create({ id: 2, title: 'Service provider' })
    await UserType.create({ id: 3, title: 'Client' })
    await UserType.create({ id: 4, title: 'Scanner' })
}
