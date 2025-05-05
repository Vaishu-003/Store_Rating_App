const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

router.use(authenticate); // all routes below require login
router.use(authorize("admin")); // only admins can access

router.post("/add-user", admin.addUser);
router.post("/add-store", admin.addStore);
router.get("/dashboard", admin.getDashboard);
router.get("/users", admin.getUsers);
router.get("/stores", admin.getStores);

module.exports = router;
