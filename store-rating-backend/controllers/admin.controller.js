const { User, Store, Rating } = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Add new user
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json({ message: "Store added", store });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dashboard summary
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filtered user list
exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role) where.role = role;

    const users = await User.findAll({ where });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filtered store list with ratings
exports.getStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where,
      include: [{ model: Rating }],
    });

    const result = stores.map(store => {
      const ratings = store.Ratings;
      const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b.rating, 0) / ratings.length).toFixed(2)
        : "No ratings";

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: avgRating,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
