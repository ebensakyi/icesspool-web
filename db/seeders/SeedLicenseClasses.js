const { LicenseClasses } = require('../models')

exports.seedLicenseClasses = async () => {
    await LicenseClasses.create({ id: 1, l_class: 'A', })
    await LicenseClasses.create({ id: 2, l_class: 'B', })
    await LicenseClasses.create({ id: 3, l_class: 'C', })
    await LicenseClasses.create({ id: 4, l_class: 'D', })
    await LicenseClasses.create({ id: 5, l_class: 'E', })

}