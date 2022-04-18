const mongoose = require('mongoose');

const characterScheme = mongoose.Schema({
    characterName: {type: String, require: true},
    level: {type: Number, require: true},
    hpMax: {type: Number, require: true},
    hpCurrent: {type: Number, require: true},
    xpMax: {type: Number, require: true},
    xpCurrent: {type: Number, require: true},
    damage: {type: Number, require: true},
    accuracy: {type: Number, require: true},
    armour: {type: Number, require: true},
    evasion: {type: Number, require: true},
    critChance: {type: Number, require: true},
    gold: {type: Number, require: true},
    potions: {
        tinyPotion: {type: Number, require: true, writable: true},
        smallPotion: {type: Number, require: true, writable: true},
        mediumPotion: {type: Number, require: true, writable: true},
        largePotion: {type: Number, require: true, writable: true},
        giantPotion: {type: Number, require: true, writable: true},
    },
    equipment: {type: Object, writable: true},
    backpack: {type: Object, writable: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User" ,require: true}
}, {minimize: false});

module.exports = mongoose.model('Character', characterScheme);