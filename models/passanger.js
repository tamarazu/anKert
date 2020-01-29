'use strict';
module.exports = (sequelize, DataTypes) => {
  const Passanger = sequelize.define('Passanger', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    balance: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Passanger.associate = function(models) {
    // associations can be defined here
  };
  return Passanger;
};