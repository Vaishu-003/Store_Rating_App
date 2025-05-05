const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User");

const Store = sequelize.define("Store", {
  name: DataTypes.STRING(60),
  email: DataTypes.STRING,
  address: DataTypes.STRING(400),
});

Store.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

module.exports = Store;
