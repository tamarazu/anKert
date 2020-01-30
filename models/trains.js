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
  }, {
    sequelize
  });
  Train.associate = function(models) {
    // associations can be defined here
    Train.belongsTo(models.Destination)
    Train.belongsToMany(models.Passanger, {trough : models.Ticket})
  };
  return Train;
};