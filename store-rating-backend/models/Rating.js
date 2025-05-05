const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User");
const Store = require("./Store");

const Rating = sequelize.define("Rating", {
  rating: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 },
  },
});

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

module.exports = Rating;
