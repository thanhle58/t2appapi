"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("journey_member", {
      member_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: "member",
          key: "member_id",
        },
      },
      journey_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: "journey",
          key: "journey_id",
        },
      },
      role: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
