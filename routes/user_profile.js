const { application } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')
const axios = require('axios').default;
require("dotenv").config()
const cloudinary = require("cloudinary").v2

const cloudinaryConfig = cloudinary.config({
    cloud_name: "dfprnrmct",
    api_key: "675798559729993",
    api_secret: "91Qs2Zepyw4L0mqlSF0aYyu4JeQ",
    secure: true
  })

router.get('/user_profile/:id', auth, async(req, res) => {

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)
    const drawingsDB = await db.drawings.findAll({})

    // console.log(user.userName);

    let followerString = user.followers
    let followerArray = []

    if(followerString != null){
        followerArray = followerString.split(', ')
    }

    let followingString = user.following
    let followingArray = []

    if(followingString != null){
        followingArray = followingString.split(', ')
    }

    let drawings = []

    for(let i = 0; i < drawingsDB.length; i++){
        console.log(drawingsDB[i].userID);
        console.log(req.user.id);

        if(drawingsDB[i].userID == req.user.id){
            let drawing = drawingsDB[i].body.replaceAll(' ', '+')
            drawings.push(drawing)
        }
    }

    console.log(drawings);
    
    res.render('user_profile', {
        user : user,
        followers : followerArray,
        following : followingArray,
        profilePic : req.user.profilePic,
        configName : cloudinaryConfig.cloud_name,
        drawings: drawings,
        loggedIn : true 
    })

})

router.get("/get-signature", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp
      },
      cloudinaryConfig.api_secret
    )
    res.json({ timestamp, signature })
})

router.post("/do-something-with-photo", async (req, res) => {
// based on the public_id and the version that the (potentially malicious) user is submitting...
// we can combine those values along with our SECRET key to see what we would expect the signature to be if it was innocent / valid / actually coming from Cloudinary
const expectedSignature = cloudinary.utils.api_sign_request({ public_id: req.body.public_id, version: req.body.version }, cloudinaryConfig.api_secret)

// We can trust the visitor's data if their signature is what we'd expect it to be...
// Because without the SECRET key there's no way for someone to know what the signature should be...
if (expectedSignature === req.body.signature) {
    // Do whatever you need to do with the public_id for the photo
    // Store it in a database or pass it to another service etc...
    let updateFollow = await db.users.update({profilePic : req.body.public_id}, {
        where: {
            userName: req.user.userName
        }
    })
}
})


module.exports = router;
