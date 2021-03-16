const { Status } = require('../models')

exports.seedStatus = async () => {
    await Status.create({ id: 1, state: 'OFFER MADE' })
    await Status.create({ id: 2, state: 'OFFER ACCEPTED' })
    await Status.create({ id: 3, state: 'OFFER IN PLACE' })
    await Status.create({ id: 4, state: 'OFFER CLOSED' })
    await Status.create({ id: 5, state: 'RATED' })
    await Status.create({ id: 6, state: 'PAID OFFER CANCELLED BY PROVIDER' })
    await Status.create({ id: 7, state: 'UNPAID OFFER CANCELLED BY PROVIDER' })
    await Status.create({ id: 8, state: 'UNPAID OFFER CANCELLED BY CLIENT' })

}
