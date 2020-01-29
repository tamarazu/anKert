'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trains = sequelize.define('Trains', {
    name: DataTypes.STRING,
    DestinationId: DataTypes.INTEGER,
    derpature: DataTypes.STRING,
    price: DataTypes.INTEGER,
    seats: DataTypes.INTEGER
  }, {});
  Trains.associate = function(models) {
    // associations can be defined here
  };
  return Trains;
};