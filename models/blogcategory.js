'use strict';
module.exports = function(sequelize, DataTypes) {
  const BlogCategory = sequelize.define('BlogCategory', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        BlogCategory.hasMany(models.Blog);
      },
    },
  });
  return BlogCategory;
};
