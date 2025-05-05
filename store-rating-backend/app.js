const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db.config");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/owner", require("./routes/owner.routes"));

sequelize.sync(); // sync tables

module.exports = app;
