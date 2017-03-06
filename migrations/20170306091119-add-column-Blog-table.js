'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('Blogs', 'BlogCategoryId', Sequelize.INTEGER);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Blogs', 'BlogCategoryId');
  },
};
