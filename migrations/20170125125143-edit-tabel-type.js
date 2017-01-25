'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Posts',
      'content',
      {
        type: Sequelize.TEXT,
      }
    );
    queryInterface.changeColumn(
      'Comments',
      'comment',
      {
        type: Sequelize.TEXT,
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Posts',
      'content',
      {
        type: Sequelize.STRING,
      }
    );
    queryInterface.changeColumn(
      'Comments',
      'comment',
      {
        type: Sequelize.STRING,
      }
    );
  },
};
