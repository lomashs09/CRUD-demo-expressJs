const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const addPost = require('../db/query').addPost;
const deletePost = require('../db/query').deletePost;
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// set multer to store image and set limits
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }
}).single('myImage');

router.post('/home/uploads', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            let imagePath = (req.file ===undefined) ? null:req.file.filename 
            addPost(Object.values(req.cookies)[0].email, req.body.post, imagePath)
            res.redirect('/home')
        }
    })
})
router.post('/delete', async (req, res) => {
    postId = Object.keys(req.body)[0]
    deletePost(postId);
    res.redirect('/home')
})

module.exports = router;