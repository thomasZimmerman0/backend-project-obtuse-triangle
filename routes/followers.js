const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')


const followerFunction = async(user, type)=>{

    let followerString = user[type]
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

    return followers
}

router.get('/followers/:id', async (req,res) => {

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)

    let followers = await followerFunction(user, 'followers')

    res.render('followers', {
        followers : followers,
        user : user,
        loggedIn : true
    })
})

router.get('/following/:id', async (req,res) => {

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)

    let followers = await followerFunction(user, 'following')

    res.render('followers', {
        followers : followers,
        user : user, 
        loggedIn : true
    })
})

module.exports = router;
