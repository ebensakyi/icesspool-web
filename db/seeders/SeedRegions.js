const { Region } = require('../models')

exports.seedRegion = async () => {
    await Region.create({ id: 1, regionName: 'Greater Accra', abbrv: 'GAR' })
  
    await Region.create({ id: 2, regionName: 'Northern', abbrv: 'NTR' })
}
