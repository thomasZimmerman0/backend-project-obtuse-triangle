const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

router.get('/followers/:id', async (req,res) => {

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)

    let followerString = user.followers
    let followerArray = []

    if(followerString != null){
        followerArray = followerString.split(', ')
    }

    let followers = []

    for(let i = 0; i < followerArray.length -1; i++){
        if(followerArray[i] != null){
            let follower = await db.users.findByPk(followerArray[i])
            followers.push(follower)
        }
    }

    res.render('followers', {
        followers : followers,
        user : req.user
    })
})

module.exports = router;
