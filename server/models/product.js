"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });
      product.belongsTo(models.cat, {
        as: "cat",
        foreignKey: {
          name: "idcat",
        },
      });
      product.belongsTo(models.vendor, {
        as: "vendor",
        foreignKey: {
          name: "idvendor",
        },
      });
    }
  }
  product.init(
    {
      iduser: DataTypes.INTEGER,
      idcat: DataTypes.INTEGER,
      idvendor: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.STRING,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
