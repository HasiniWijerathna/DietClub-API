'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BlogCategories', [{
      name: 'Technology',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/businessman-pointing-graphs-and-symbols_1232-917.jpg',
    }, {
      name: 'Education',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/stack-of-books-with-glasses-on-wooden-desk_1134-17.jpg',
    }, {
      name: 'Photography',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/hands-holding-a-reflex-camera_1296-136.jpg',
    }, {
      name: 'Music',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/vinyl-record-with-an-old-camera-and-some-old-books_1304-669.jpg',
    }, {
      name: 'Travel',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/lace-sport-wood-smiling-fun_1304-1041.jpg',
    }, {
      name: 'Life Style',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/close-up-of-woman-running-with-unfocused-background_23-2147600468.jpg',
    }, {
      name: 'Food',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/raw-pasta-with-tomatoes-and-cheese-on-a-black-table-making-a-circle_1309-53.jpg',
    }, {
      name: 'Beauty',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/woman-with-wedding-dress-lying-on-the-floor_1304-153.jpg',
    }]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BlogCategories', [{
      name: 'Technology',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/businessman-pointing-graphs-and-symbols_1232-917.jpg',
    }, {
      name: 'Education',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/stack-of-books-with-glasses-on-wooden-desk_1134-17.jpg',
    }, {
      name: 'Photography',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/hands-holding-a-reflex-camera_1296-136.jpg',
    }, {
      name: 'Music',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/vinyl-record-with-an-old-camera-and-some-old-books_1304-669.jpg',
    }, {
      name: 'Travel',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/lace-sport-wood-smiling-fun_1304-1041.jpg',
    }, {
      name: 'Life Style',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/close-up-of-woman-running-with-unfocused-background_23-2147600468.jpg',
    }, {
      name: 'Food',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/raw-pasta-with-tomatoes-and-cheese-on-a-black-table-making-a-circle_1309-53.jpg',
    }, {
      name: 'Beauty',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://image.freepik.com/free-photo/woman-with-wedding-dress-lying-on-the-floor_1304-153.jpg',
    }]);
  },
};
