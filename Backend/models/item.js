const mongoose = require('mongoose');

const itemScheme = mongoose.Schema({    
    name: {type: String, require: true},
    type: {type: String, require: true},
    level: {type: Number, require: true},
    damage: {},
    accuracy: {},
    maxHp: {},
    armour: {},
    description: {type: String, require: true},
});

module.exports = mongoose.model('Item', itemScheme);