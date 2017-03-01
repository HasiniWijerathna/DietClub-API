'use strict';
module.exports = function(sequelize, DataTypes) {
  const Blog = sequelize.define('Blog', {
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    BlogCategoryId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        Blog.belongsTo(models.User);
        Blog.belongsTo(models.BlogCategory);
        Blog.hasMany(models.Posts);
        Blog.hasMany(models.BlogCount);
      },
    },
  });
  return Blog;
};
