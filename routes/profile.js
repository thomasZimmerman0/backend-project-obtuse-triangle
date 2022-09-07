const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

const isFollowing = async(user, profile)=>{

    let followerString = profile.followers
    let followerArray = []

    if(followerString != null){
        followerArray = followerString.split(', ')
    }

    let userID = user.id.toString()

    if(followerArray.includes(userID)){
        return true
    } else {
        return false
    }

}


router.get('/profile/:id', async(req, res) => {

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)

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
    
    res.render('profile', {
        user : user,
        configName: "dfprnrmct",
        profilePic: user.profilePic,
        followers : followerArray,
        following : followingArray,
        fStatus : await isFollowing(req.user, user),
        loggedIn : true
    })
    
    
})

// router.post("/profile", upload.single("image"), (req, res) =>{
//     res.render('profile')
// })

router.get("/unfollow/:id", auth, async(req, res)=>{
    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)
    let followerString = user.followers

    let unfollowID = req.user.id + ', '

    followerString = followerString.replaceAll(unfollowID, '')

    let updateFollow = await db.users.update({ followers: followerString}, {
        where: {
            userName: user.userName
        }
    })

    let followingString = req.user.following

    followingString = followingString.replaceAll(unfollowID, '')

    let updateFollowers = await db.users.update({ following: followingString}, {
        where: {
            userName : req.user.userName
        }
    })

    res.redirect(`/profile/${selectedID}`)
})

router.get("/follow/:id", auth, async (req, res)=>{

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)
    let followerString = user.followers

    followerString += req.user.id + ', '

    let updateFollow = await db.users.update({ followers: followerString}, {
        where: {
            userName: user.userName
        }
    })

    let followingString = req.user.following

    followingString += user.id + ', '

    let updateFollowers = await db.users.update({ following: followingString}, {
        where: {
            userName : req.user.userName
        }
    })

    res.redirect(`/profile/${selectedID}`)
})

router.get('/delete/:id', async (req, res)=>{

    let selectedID = req.params.id


    let deleteAccount = await db.users.destroy({
        where: {
            id : selectedID
        }
    })

    res.redirect('/')
})


module.exports = router;
