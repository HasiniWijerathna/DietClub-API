'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('BlogCategories', 'imageURL', Sequelize.STRING);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('BlogCategories', 'imageURL');
  },
};
