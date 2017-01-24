'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn('Posts', 'UserId', Sequelize.INTEGER);
    queryInterface.addColumn('Comments', 'UserId', Sequelize.INTEGER);
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn('Posts', 'UserId');
    queryInterface.addColumn('Comments', 'UserId');
  },
};
