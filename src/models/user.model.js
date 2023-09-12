const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("usert", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  avatar: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
});

module.exports = User;
