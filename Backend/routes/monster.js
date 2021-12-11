const express = require("express");
const MonsterController = require("../controllers/monsterController");

const router = express.Router();

router.post("/create", MonsterController.createMonster);

router.post("/:enemyName", MonsterController.getMonsters);

module.exports = router;