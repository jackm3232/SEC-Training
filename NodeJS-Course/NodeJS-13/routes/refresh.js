const express = require("express");
const router = express.Router();
const refresh_token_controller = require("../controllers/refresh_token_controller");

router.get("/", refresh_token_controller.handle_refresh_token);

module.exports = router;
