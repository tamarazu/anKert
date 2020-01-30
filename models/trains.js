'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Train extends Model{}
  Train.init({
    name: DataTypes.STRING,
    DestinationId: DataTypes.INTEGER,
    derpature: DataTypes.STRING,
    price: DataTypes.INTEGER,
    seats: DataTypes.INTEGER
  }, {});
  Train.associate = function(models) {
    // associations can be defined here
  };
  return Train;
};