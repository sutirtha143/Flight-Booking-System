'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addConstraint('Airports', {
      type: 'FOREIGN KEY', //we added an extra migration file to add foreign key
      fields: ['cityId'], //constraint to airport table cityId column which will
      name: 'city_fkey_constraint',// reference and show data from city table 'id' column
      references: {
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('Airports', 'city_fkey_constraint')
  }
};
