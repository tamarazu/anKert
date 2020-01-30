'use strict';
var bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Admin extends Model{}
  Admin.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks : {
      beforeCreate : (admin, options) =>{
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(admin.password, salt)
        admin.password = hash
      }
    }
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};