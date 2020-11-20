"use strict";
const { DATE } = require("sequelize");
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
      "member",
      [
        {
          user_base_id: uuidv4(),
          member_id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_base_id: uuidv4(),
          member_id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_base_id: uuidv4(),
          member_id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_base_id: uuidv4(),
          member_id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_base_id: uuidv4(),
          member_id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_base_id: uuidv4(),
          member_id: uuidv4(),
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
