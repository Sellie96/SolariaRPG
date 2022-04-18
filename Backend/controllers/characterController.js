const Character = require('../models/character')

exports.createCharacter = (req, res, next) => {
  console.log(req.body.characterName);
  const character = new Character({
    characterName: req.body.characterName,
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
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
    },
    backpack: {},
    userId: req.userData.userId,
  })
  character.save().then((createdCharacter) => {
    res.status(201).json({
      message: 'Character created successfully',
      characterId: createdCharacter._id
    })
  })
}

exports.getCharacters = (req, res, next) => {
  Character.find({ userId: req.userData.userId }).then((documents) => {
    res.status(200).json({
      message: 'Character fetched succesfully',
      character: documents,
    })
  })
}

exports.killCharacter = (req, res, next) => {
  Character.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    (result) => {
      console.log(result)
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Oh Dear you have died' })
      } else {
        res.status(401).json({ message: 'This is not your character to kill' })
      }
    },
  )
}

exports.updateCharacter = (req, res, next) => {
  Character.findByIdAndUpdate(req.params.id, {
    characterName: req.body.characterName,
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
  }).then((result) => {
    res.status(200).json({ message: 'Update succesful' })
  })
}
