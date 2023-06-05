const express = require("express");
const router = express.Router();
const cors = require("cors");

const todoController = require("../controller/todoController");

router.use(cors());

router.post("/", todoController.postData);
router.get("/", todoController.getData);
router.put("/:id", todoController.updateData);
router.delete("/:id", todoController.removeData);
router.get("/user", todoController.getUser);
router.post("/user", todoController.postUser);

module.exports = router;
