const mongoose = require('mongoose');

const monsterScheme = mongoose.Schema({
    name: {type: String, require: true},
    level: {type: Number, require: true},
    hpCurrent: {type: Number, require: true},
    hpMax: {type: Number, require: true},
    damage: {type: Number, require: true},
    accuracy: {type: Number, require: true},
    armour: {type: Number, require: true},
    evasion: {type: Number, require: true},
    critChance: {type: Number, require: true},
    xp: {type: Number, require: true},
    gold: {type: Number, require: true}
});

module.exports = mongoose.model('Monster', monsterScheme);