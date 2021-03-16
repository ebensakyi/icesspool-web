module.exports = (sequelize, Sequelize) => {

    const LicenseClasses = sequelize.define('LicenseClasses', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        l_class: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true

        },
        deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
      
        freezeTableName: true
    });
   
    LicenseClasses.sync({ force: false }).catch(error => {
        console.log("LicenseClasses.sync: ", error)
    })

    return LicenseClasses;
};
