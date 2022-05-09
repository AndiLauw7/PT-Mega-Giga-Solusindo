"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cat.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });
    }
  }
  cat.init(
    {
      iduser: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cat",
    }
  );
  return cat;
};
