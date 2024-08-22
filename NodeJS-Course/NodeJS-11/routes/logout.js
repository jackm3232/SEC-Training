const express = require("express");
const router = express.Router();
const logout_controller = require("../controllers/logout_controller");

router.get("/", logout_controller.handle_logout);

module.exports = router;
