"use strict";

/**  @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("post", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("post");
  },
};
