'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn('Blogs', 'count', Sequelize.INTEGER);
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn('Blogs', 'count');
  },
};
