const { MomoNetwork } = require('../models')

exports.seedMomoNetwork = async () => {
    await MomoNetwork.create({ id: 1, network: 'MTN', status: 1, abbrv: 'MTN' })
    await MomoNetwork.create({ id: 2, network: 'VODAFONE', status: 1, abbrv: 'VDF' })
    await MomoNetwork.create({ id: 3, network: 'AIRTELTIGO', status: 1, abbrv: 'TGO' })

}