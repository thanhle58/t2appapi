"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("journey_place", {
      journey_place_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      place_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "place",
          key: "place_id",
        },
      },
      journey_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "journey",
          key: "journey_id",
        },
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
