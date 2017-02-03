'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
      queryInterface.removeColumn('Blogs', 'Likes');
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.addColumn('Blogs', 'Likes', Sequelize.INTEGER);
  },
};
