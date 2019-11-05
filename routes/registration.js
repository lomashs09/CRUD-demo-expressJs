const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const addUser = require('../db/query').addUser;
const validateNewUser = require('../validator/validators').validateNewUser;
const dotenv = require('dotenv');

dotenv.config();

let saltRounds = 10;
router.get('/', (req, res) => {
    return res.render("register");
});
router.post('/submit', (req, res) => {
    let { error } = validateNewUser(req);
    if (!error) {
        // hashing the password using bcrypt
        hashPassword(req.body.password).then((hashedPassword) =>
            addUser(req.body.name, req.body.phone, req.body.email, hashedPassword)
                .then(() => {
                    createJwtSign(req, res)
                })
                .catch((err) => res.status(400).send(err.code))
        );
    } else {
        res.status(400).send(error.details[0].message);
    }
});

function createJwtSign(req, res) {
    const User = {
        username: req.body.name,
        email: req.body.email
    };
    
    jwt.sign({ User }, process.env.secretkey, (err, token) => {
        req.headers["authorization"] = `bearer ${token}`
        if (err) {
            console.log(err)
        }
        // setting token in Cookies
        setCookie(req,res,token);
        // setting token in headers 

        res.redirect('/home')
    });
}
function setCookie(req, res, token) {
    console.log(req.body.email)
    let usertoken = {
        email:req.body.email,
        token: `Bearer ${token}`
    }
    return res.cookie("userToken", usertoken);
}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        });
    })
}
module.exports = router;