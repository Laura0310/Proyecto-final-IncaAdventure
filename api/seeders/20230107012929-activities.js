'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Add seed commands here.

    // Example:
    await queryInterface.bulkInsert('Activities', [
      {
        name: 'Aventura a la montaña de machu pichu',
        price: 34,
        schedule: 'a primera hora de realizara..',
        start_at: 2,
        end_at: 5,
        description: 'lakaksjaasjksajjshhahs',
        allowed_age: 'everyone',
        difficulty_level: 'beginners',
        type: 'rafting'
      }
    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Activities', null, {});

  }
};
