module.exports = (sequelize, Sequelize) => {
    const bcrypt = require('bcrypt')
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otherNames: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fcm: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        activated: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        createdAt: {
            type: Sequelize.DATE(3),
        },
        updatedAt: {
            type: Sequelize.DATE(3),
        },
    }, {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        freezeTableName: true
    });
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }


    User.associate = (models) => {

        User.hasOne(models.UserType, {
            foreignKey: 'userTypeId',
            // as: 'userType',
        });
        User.hasOne(models.Vehicle);


        User.hasOne(models.Provider, {
            foreignKey: 'userId',
            // as: 'provider',
        });
        User.hasOne(models.Location, {
            foreignKey: 'userId',
            // as: 'provider',
        });
     
        User.hasMany(models.Rating, {
            foreignKey: 'userId',
            // as: 'provider',
        });
    
        User.hasOne(models.Client, {
            foreignKey: 'userId',
            // as: 'client',
        });
    };
    User.sync({ force: false });

    return User;
};
