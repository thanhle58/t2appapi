"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "place",
      [
        {
          place_id: uuidv4(),
          title: "place",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          place_id: uuidv4(),
          title: "place",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          place_id: uuidv4(),
          title: "place",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          place_id: uuidv4(),
          title: "place",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          place_id: uuidv4(),
          title: "place",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          place_id: uuidv4(),
          title: "place",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          place_id: uuidv4(),
          title: "place",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
