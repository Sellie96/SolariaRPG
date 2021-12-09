const mongoose = require('mongoose');

const characterScheme = mongoose.Schema({
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
});

module.exports = mongoose.model('Character', characterScheme);