module.exports = (sequelize, Sequelize) => {
  const Provider = sequelize.define(
    "Provider",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      passportPicture: {
        type: Sequelize.TEXT,
      },
      idCardPicture: {
        type: Sequelize.TEXT,
      },
      company: {
        type: Sequelize.STRING,
      },
      officeLocation: {
        type: Sequelize.STRING,
      },
      ghanaPostGPS: {
        type: Sequelize.STRING,
      },
      licenseNumber: {
        type: Sequelize.STRING,
      },
      licenseClassification: {
        type: Sequelize.INTEGER,
      },
      driversLicense: {
        type: Sequelize.STRING,
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
    },
    {
      freezeTableName: true,
    }
  );
  Provider.associate = (models) => {
    Provider.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Provider.hasMany(models.Transaction);

    Provider.hasMany(models.Withdrawal, {
      foreignKey: "providerId",
    });

    Provider.hasOne(models.ProviderBalance, {
      foreignKey: "providerId",
    });
    Provider.hasOne(models.ProviderRating);
    Provider.hasOne(models.MomoAccount, {
      foreignKey: "providerId",
    });

    Provider.hasMany(models.Withdrawal, { foreignKey: "providerId" });
    Provider.belongsTo(models.LicenseClasses, {
      foreignKey: "licenseClassification",
    });
  };

  Provider.sync({ force: false });

  return Provider;
};
