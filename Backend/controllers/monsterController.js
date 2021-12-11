const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Monster = require('../models/monster');

exports.createMonster = (req, res, next) => {
    const monster = new Monster({
        name: req.body.name,
        level: req.body.level,
        hpMax: req.body.hpMax,
        hpCurrent: req.body.hp,
        damage: req.body.dmg,
        accuracy: req.body.attack,
        armour: req.body.armour,
        evasion: req.body.evasion,
        gold: req.body.gold,
        xp: req.body.xp
    })
    monster.save()
        .then(result => {
            res.status(201).json({
                message: 'Monster created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.getMonsters = (req, res, next) => {
    Monster.find()
    .then(documents => {
        res.status(200).json({
            message: "Character fetched succesfully",
            monster: documents,
          });
    });
}