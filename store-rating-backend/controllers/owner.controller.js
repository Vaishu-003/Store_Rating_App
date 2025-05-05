const { Store, Rating, User } = require("../models");
const bcrypt = require("bcryptjs");

exports.getStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: { ownerId },
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
      ],
    });

    if (!store) return res.status(404).json({ error: "Store not found" });

    const ratings = store.Ratings.map((r) => ({
      rating: r.rating,
      user: {
        id: r.User.id,
        name: r.User.name,
        email: r.User.email,
      },
    }));

    const avgRating = ratings.length
      ? (
          ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        ).toFixed(2)
      : "No ratings";

    res.json({ store: store.name, averageRating: avgRating, ratings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = req.user;
    const { newPassword } = req.body;

    if (!newPassword.match(/^(?=.*[A-Z])(?=.*\W).{8,16}$/)) {
      return res.status(400).json({
        error:
          "Password must be 8–16 chars, include at least 1 uppercase letter and 1 special character.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
