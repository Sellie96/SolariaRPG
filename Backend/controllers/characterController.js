const Character = require("../models/character");

exports.createCharacter = (req, res, next) => {
  const character = new Character({
    level: 1,
    hpMax: 100,
    hpCurrent: 100,
    xpMax: 100,
    xpCurrent: 0,
    damage: 20,
    accuracy: 1000,
    armour: 0,
    evasion: 500,
    critChance: 1,
    gold: 0,
    potions: {
      tinyPotion: 0,
      smallPotion: 0,
      mediumPotion: 0,
      largePotion: 0,
      giantPotion: 0,
    },
    equipment: {
      0: { name: "TestName", type: "weapon"},
      1: { name: "TestShield", type: "shield"},
      2: { name: "TestHelm", type: "helm"},
      3: { name: "TestBody", type: "body"},
      4: { name: "TestLegs", type: "legs"},
      5: { name: "TestBoots", type: "boots"},
      6: { name: "TestGloves", type: "gloves"},
      7: { name: "TestNecklace", type: "necklace"},
      8: { name: "TestRing", type: "ring"},
      9: { name: "TestCape", type: "cape"}
    },
    backpack: {
      0: { name: "TestName", type: "weapon"},
    },
    userId: req.userData.userId,
  });
  character.save().then((createdCharacter) => {
    res.status(201).json({
      message: "Character created successfully",
      characterId: createdCharacter._id,
    });
  });
};

exports.getCharacters = (req, res, next) => {
  Character.find({ userId: req.userData.userId }).then((documents) => {
    res.status(200).json({
      message: "Character fetched succesfully",
      character: documents,
    });
  });
};

exports.killCharacter = (req, res, next) => {
  Character.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    (result) => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Oh Dear you have died" });
      } else {
        res.status(401).json({ message: "This is not your character to kill" });
      }
    }
  );
};

exports.updateCharacter = (req, res, next) => {
  const character = new Character({
    _id: req.body.id,
    level: req.body.level,
    hpMax: req.body.hpMax,
    hpCurrent: req.body.hpCurrent,
    xpMax: req.body.xpMax,
    xpCurrent: req.body.xpCurrent,
    damage: req.body.damage,
    accuracy: req.body.accuracy,
    armour: req.body.armour,
    evasion: req.body.evasion,
    critChance: req.body.critChance,
    gold: req.body.gold,
    equipment: req.body.equipment,
    backpack: req.body.backpack,
    potions: req.body.potions,
  });
  Character.updateOne(
    { _id: req.params.id, userId: req.userData.userId },
    character
  ).then((result) => {
    res.status(200).json({ message: "Update succesful" });
  });
};
