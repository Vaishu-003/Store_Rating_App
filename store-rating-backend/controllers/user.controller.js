const { Store, Rating } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

// View and search stores
exports.getStores = async (req, res) => {
  try {
    const { name, address } = req.query;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where,
      include: [{ model: Rating }],
    });

    const userId = req.user.id;

    const result = stores.map(store => {
      const ratings = store.Ratings;
      const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b.rating, 0) / ratings.length).toFixed(2)
        : "No ratings";

      const userRating = ratings.find(r => r.userId === userId)?.rating || null;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating: avgRating,
        userRating: userRating,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit or update rating
exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be 1-5" });
    }

    const existingRating = await Rating.findOne({ where: { userId, storeId } });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ message: "Rating updated", rating: existingRating });
    }

    const newRating = await Rating.create({ userId, storeId, rating });
    res.status(201).json({ message: "Rating submitted", rating: newRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const user = req.user;
    const { newPassword } = req.body;

    if (!newPassword.match(/^(?=.*[A-Z])(?=.*\W).{8,16}$/)) {
      return res.status(400).json({
        error:
          "Password must be 8-16 characters, include at least one uppercase letter and one special character.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
