'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Destination extends Model{}
  Destination.init({
    name: DataTypes.STRING
  }, {});
  Destination.associate = function(models) {
    // associations can be defined here
  };
  return Destination;
};