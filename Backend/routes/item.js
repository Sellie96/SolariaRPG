const express = require("express");
const ItemController = require("../controllers/itemController");

const router = express.Router();

router.post("/create", ItemController.createItem);

router.post("/:itemName", ItemController.getItem);

module.exports = router;