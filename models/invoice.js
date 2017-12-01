'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    total: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    paymentType: DataTypes.ENUM,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Invoice;
};