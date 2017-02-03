'use strict';
module.exports = function(sequelize, DataTypes) {
  const BlogCount = sequelize.define('BlogCount', {
    BlogId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        BlogCount.belongsTo(models.User);
        BlogCount.belongsTo(models.Blog);
      },
    },
  });
  return BlogCount;
};
