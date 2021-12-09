const express = require("express");
const bodyParser = require("body-parser");


const app = express();

const Character = require("./models/character")

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Solaran:Ikdx9139@cluster0.ty5ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected')
}).catch (() =>
console.log('Connection failed!')
);

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post("/character", (req, res, next) => {
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
    });
    character.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/character", (req, res, next) => {
    Character.find()
    .then(documents => {
        res.status(200).json({
            message: "Character fetched succesfully",
            character: documents,
          });
    });
});

app.delete("/character/:id", (req, res, next) => {
    Character.deleteOne({_id: req.params.id}).then(result => {
        console.log(result)
        res.status(200).json({message: "Deleted"})
    })
})

module.exports = app;
