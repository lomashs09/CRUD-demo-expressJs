const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const addUser = require('../db/query');
let saltRounds  = 10; 
router.get('/', (req, res) => {
    return res.render("home");
});
router.post('/submit', (req, res) => {
    error =false
    // let { error } = validateUser(req);
    if (!error) {
        hashPassword(req.body.password).then((hashedPassword) =>
            addUser(req.body.name,req.body.phone,req.body.email, hashedPassword)
                .then(() => console.log('successful added'))
                .catch((err) => res.status(400).send(err.code))
        );
    } else {
        res.status(400).send(error.details[0].message);
    }
});

function hashPassword(password) {
    var hashedValue;
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