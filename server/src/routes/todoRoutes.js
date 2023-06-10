const express = require("express");
const router = express.Router();
const cors = require("cors");

const todoController = require("../controllers/todoController");

router.use(cors());

router.post("/", todoController.postData);
router.get("/", todoController.getData);
router.put("/:id", todoController.updateData);
router.delete("/:id", todoController.removeData);

module.exports = router;
