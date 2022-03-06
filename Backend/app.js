const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")

const app = express();

const characterRoutes = require("./routes/character");
const userRoutes = require("./routes/user");
const monsterRoutes = require("./routes/monster");
const itemRoutes = require("./routes/item");

const mongoose = require("mongoose")



mongoose.connect("mongodb://GAMEADMIN:"+ process.env.MONGO_ATLAS_PW +"@cluster0-shard-00-00.ty5ph.mongodb.net:27017,cluster0-shard-00-01.ty5ph.mongodb.net:27017,cluster0-shard-00-02.ty5ph.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-s7gkkl-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => {
    console.log('Connected')
}).catch ((err) =>
console.log(err)
);

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "angular")))

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT , DELETE, OPTIONS');
    next();
});

app.use("/character",characterRoutes)

app.use("/user", userRoutes)

app.use("/monster", monsterRoutes)

app.use("/item", itemRoutes)

app.use((req,res,next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
