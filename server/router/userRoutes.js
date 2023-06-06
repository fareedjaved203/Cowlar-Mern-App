const express = require("express");
const router = express.Router();
const cors = require("cors");

const userController = require("../controller/userController");

router.use(cors());

router.post("/signin", userController.authenticateUser);
router.post("/signup", userController.postUser);

module.exports = router;
