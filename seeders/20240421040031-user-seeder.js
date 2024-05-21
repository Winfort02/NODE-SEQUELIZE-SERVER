"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
          /**
     * User Seeder
     */
    const bcrypt = require("bcrypt");
    const saltRounds = 12;
    await import("uuid").then(async (module) => {
      const { v4 } = module;
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            id: v4(),
            name: "Jerwin Fortillano",
            username: "winfort02",
            userType: 1,
            email: "winfort02@gmail.com",
            password: await bcrypt.hash("#Jerwin123", saltRounds),
          },
          {
            id: v4(),
            name: "Sean Siclot",
            username: "sean02",
            userType: 0,
            email: "seansiclot@gmail.com",
            password: await bcrypt.hash("#Sean123", saltRounds),
          },
        ],
        {}
      );
    });

    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Drop table
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
