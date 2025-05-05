const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

router.use(authenticate); // must be logged in
router.use(authorize("user")); // only normal users

router.get("/stores", user.getStores);
router.post("/rating", user.submitRating);
router.put("/update-password", user.updatePassword);

module.exports = router;
