const Character = require("../models/character")

exports.createCharacter = (req, res, next) => {
    const character = new Character({
      level: 1,
      hpMax: 100,
      hpCurrent: 100,
      xpMax: 100,
      xpCurrent: 0,
      damage: 5,
      accuracy: 1000,
      armour: 0,
      evasion: 1000,
      critChance: 1,
      userId: req.userData.userId
    });
    character.save().then(createdCharacter => {
        res.status(201).json({
            message: 'Post added successfully',
            characterId: createdCharacter._id
        });
    });
}

exports.getCharacters =  (req, res, next) => {
    Character.find({userId: req.userData.userId})
    .then(documents => {
            res.status(200).json({
                message: "Character fetched succesfully",
                character: documents,
              });
    });
}

exports.killCharacter = (req, res, next) => {
    Character.deleteOne({_id: req.params.id, userId: req.userData.userId}).then(result => {
        console.log(result)
        if(result.deletedCount > 0){
            res.status(200).json({message: "Deleted"})
        } else {
            res.status(401).json({message: "Not authorised"})
        }
    })
}

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
      critChance: req.body.critChance
    })
    Character.updateOne({_id: req.params.id, userId: req.userData.userId}, character ).then(result => {
        console.log(result)
        res.status(200).json({message: "Update succesful"})
    })
}