'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Passanger extends Model{}
  Passanger.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    balance: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize
  });
  Passanger.associate = function(models) {
    // associations can be defined here
    Passanger.belongsToMany(models.Train, {through : models.Ticket})
  };
  return Passanger;
};