const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profile_images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({storage: storage})

router.get('/profile',auth, (req,res) => {

   
    res.render('profile', {

        username: req.user.userName,
        email: req.user.email
        
    })

})

router.post("/profile", upload.single("image"), (req, res) =>{
    res.render('profile')
})

router.get("/follow", auth, async (req, res)=>{
    
    console.log('hello');
    let updateFollow = await db.users.update({ followers: "1"}, {
        where: {
            userName: req.user.userName
        }
    })
})


module.exports = router;
