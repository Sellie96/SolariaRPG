const express = require("express");
const auth = require("../middleware/check-auth")
const CharacterController = require("../controllers/characterController")

const router = express.Router();


router.post("", auth, CharacterController.createCharacter);

router.get("", auth, CharacterController.getCharacters);

router.delete("/:id", auth, CharacterController.killCharacter);

module.exports = router;