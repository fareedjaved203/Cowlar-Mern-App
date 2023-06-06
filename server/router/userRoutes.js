const express = require("express");
const router = express.Router();
const cors = require("cors");

const userController = require("../controller/userController");

router.use(cors());

router.post("/signin", userController.authenticateUser);
router.post("/signup", userController.postUser);
router.post("/signin/:email", userController.getUser);

module.exports = router;
