const Item = require('../models/item');

exports.createItem = (req, res, next) => {
    const item = new Item({
        name: req.body.name,
        type: req.body.type,
        level: req.body.level,
        damage: req.body.damage,
        accuracy: req.body.accuracy,
        maxHp: req.body.maxHp,
        armour: req.body.armour,
        value: req.body.value
    })
    item.save()
        .then(result => {
            res.status(201).json({
                message: 'Item created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.getItem = (req, res, next) => {
    Item.findOne({name: req.params.itemName})
    .then(item => {
        res.status(200).json({
            message:  req.params.itemName + " fetched succesfully",
            item: item,
          });
    });
}