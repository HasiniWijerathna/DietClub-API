'use strict';
module.exports = (sequelize, DataTypes) => {
  var lineItem = sequelize.define('lineItem', {
    quantity: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return lineItem;
};