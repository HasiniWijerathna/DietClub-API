'use strict';
module.exports = (sequelize, DataTypes) => {
  var Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Member.belongsTo(models.Branch);s
      }
    }
  });
  return Member;
};
