"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Policies", {
      id: {
      	type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
      },
      policyName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      isPolicyActive: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Policies");
  },
};
