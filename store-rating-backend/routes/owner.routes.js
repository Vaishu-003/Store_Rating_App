const express = require("express");
const router = express.Router();
const owner = require("../controllers/owner.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

router.use(authenticate);
router.use(authorize("owner")); // only for store owners

router.get("/ratings", owner.getStoreRatings);
router.put("/update-password", owner.updatePassword);

module.exports = router;
