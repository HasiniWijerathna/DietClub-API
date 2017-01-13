'use strict';
module.exports = function(sequelize, DataTypes) {
  const Blog = sequelize.define('Blog', {
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Blog.belongsTo(models.User);
      }
    }
  });
  return Blog;
};
