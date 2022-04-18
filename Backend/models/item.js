const mongoose = require('mongoose');

const itemScheme = mongoose.Schema({    
    name: {type: String, require: true},
    type: {type: String, require: true},
    level: {type: Number, require: true},
    damage: {type: Number},
    accuracy: {type: Number},
    maxHp: {type: Number},
    armour: {type: Number},
    value: {type: Number},
});

module.exports = mongoose.model('Item', itemScheme);