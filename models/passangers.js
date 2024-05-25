'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passangers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Passangers.init({
    userId: DataTypes.UUID,
    title: DataTypes.ENUM,
    fullName: DataTypes.STRING,
    familyName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    nationality: DataTypes.STRING,
    identityId: DataTypes.STRING,
    issuingCountry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Passangers',
  });
  return Passangers;
};