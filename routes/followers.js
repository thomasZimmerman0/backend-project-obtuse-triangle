const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

<<<<<<< HEAD
router.get('/accounts', async (req,res) => {

    const user = await db.users.findAll({})


    res.render('accounts', {
=======
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
<<<<<<< HEAD
        user : user
    })
})

router.get('/following/:id', async (req,res) => {

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)

    let followers = await followerFunction(user, 'following')

    res.render('followers', {
        followers : followers,
>>>>>>> 676998f (fixed followers pages and profile pics work on accounts that are not the users)
        user : user
=======
        user : req.user
>>>>>>> f9eddb5 (mihoyminoy)
    })
})

module.exports = router;
