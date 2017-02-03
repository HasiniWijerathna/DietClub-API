'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Blog);
        User.hasMany(models.BlogCount);
      },
    },
  });
  return User;
};
