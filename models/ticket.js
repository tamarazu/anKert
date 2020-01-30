'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Ticket extends Model{}
  Ticket.init({
    TrainId: DataTypes.INTEGER,
    PassangerId: DataTypes.INTEGER,
    seat_number: DataTypes.INTEGER
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
  };
  return Ticket;
};