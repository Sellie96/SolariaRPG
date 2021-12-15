const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');


exports.createUser = (req,res,next)=> {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            gamemode: req.body.gamemode,
            username: req.body.username,
            password: hash
        })
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User registered, please login!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            })
        })
    })
}

exports.loginUser = (req,res,next) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if(!user){
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        console.log(result);
        if(!result){
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        const token = jwt.sign({username: fetchedUser.username, userId: fetchedUser._id}, process.env.JWT_KEY);
        res.status(200).json({
            token: token,
            userId: fetchedUser._id,
            message: "Logged in succesfully, please choose a character"
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}