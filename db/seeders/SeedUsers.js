const { User } = require('../models')

exports.seedUser = async () => {
    try {
        await User.create({ surname: 'Sakyi', otherNames: 'Ebenezer Agyemang', email: 'ebensakyi@gmail.com', phoneNumber: '0000000000', password: 'kofi@2318.com', userTypeId: 1, activated: 1 })
        await User.create({  surname: 'Antwi', otherNames: 'Emmanuel', email: 'antwiimma123@gmail.com', phoneNumber: '0550216288', password: 'antwi@2021', userTypeId: 1, activated: 1 })
        await User.create({  surname: 'Aboagye', otherNames: 'Dominic', email: 'stlithium21@yahoo.com', phoneNumber: '0209125718', password: 'dominic@2021', userTypeId: 1, activated: 1 })

    } catch (error) {
        console.log(error)
    }

}
