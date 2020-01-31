'use strict';
var bcrypt = require('bcryptjs')

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
    sequelize,
    hooks : {
      beforeCreate : (passanger, options) =>{
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(passanger.password, salt)
        passanger.password = hash
      }
    }
  });
  Passanger.associate = function(models) {
    // associations can be defined here
    Passanger.belongsToMany(models.Train, {through : models.Ticket})
  };
  return Passanger;
};