
const express = require("express");
const router = express.Router();
const verifyUser = require('../db/query').verifyUser;
const validateLoginDetails = require('../validator/validators').validateLoginDetails;

router.get('/login', (req, res) => {
    return res.render("login");
});

router.post('/home', async (req, res) => {
    let { error } = validateLoginDetails(req)
    if (!error) {
        verifyUser(req.body.email, req.body.password)
            .then(async (result) => {
                if (result.rowCount >= 1) {
                    setCookie(res, req.body.email);
                    res.redirect('/home')
                }
                else {
                    res.render('login', { msg: 'Invalid Email or Password' });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send(err.code);
            })
    } else {
        res.status(400).send(error.details[0].message);
    }
});

function setCookie(res, email) {
    let user = {
        email
    }
    return res.cookie("userData", user);
    
}

module.exports = router;