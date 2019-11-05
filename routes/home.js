const express = require("express");
const router = express.Router();
const fetchPosts = require('../db/query').fetchPosts;

router.get('/home', async(req,res)=>{
    if(Object.values(req.cookies)[0]!==undefined){
    var allPosts = await fetchPosts()
    res.render("home",{email:Object.values(req.cookies)[0].email,allPosts:allPosts.rows})
    }else{
        res.render('login',{msg:'Please login before proceeding'})
    }
})

module.exports = router;