const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")

const app = express();

const characterRoutes = require("./routes/character");
const userRoutes = require("./routes/user");
const monsterRoutes = require("./routes/monster");

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Solaran:"+ process.env.MONGO_ATLAS_PW +"@cluster0.ty5ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected')
}).catch (() =>
console.log('Connection failed!')
);

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "angular")))

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use("/character",characterRoutes)

app.use("/user", userRoutes)

app.use("/monster", monsterRoutes)

app.use((req,res,next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
