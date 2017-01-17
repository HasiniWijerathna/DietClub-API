'use strict';
module.exports = function(sequelize, DataTypes) {
  const Comments = sequelize.define('Comments', {
    comment: DataTypes.STRING,
    PostId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Comments.belongsTo(models.Posts);
      },
    },
  });
  return Comments;
};
