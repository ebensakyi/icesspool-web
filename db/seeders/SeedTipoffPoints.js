const { TipoffPoint } = require('../models')

exports.seedTipoffPoint = async () => {
    await TipoffPoint.create({ id: 1, siteName: 'Sewerage Systems', placeId: 'ChIJ07NOXM6Q3w8RdRBmNdINhDk', address: 'Korle Lagoon, Guggisberg Avenue, Accra, Ghana', location: 'James Town', gps: '', lat: 5.5325481, lng: -0.218367 })
    await TipoffPoint.create({ id: 2, siteName: 'Accra Compost Recycle Plant, ACRP', placeId: 'ChIJzfWERjoK3w8RH1QuggFUpqE', address: 'Eastern Region, Ghana', location: 'Adjen Kotoku', gps: '', lat: 5.756654, lng: -0.361391 })
}
