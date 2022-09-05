const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models')

router.get('/registration', (req,res) => {

<<<<<<< HEAD
    res.render('registration', {

        user : "null" 
=======
    res.render('registration',{
        user : req.user
>>>>>>> f9eddb5 (mihoyminoy)
    })
})

router.post('/registration', async (req, res) =>{

    try{

        let{username, email, password} = req.body;

        password = bcrypt.hashSync(password, 8)

        let insertRecord = await db.users.create({
            userName: username, 
            email: email,
            password: password,
            followers: '',
            following: '',
            drawings: '',
            profilePic: '',
            roleID: 1
        })

        res.redirect('login')
    }
    catch(error){
        console.log(error);
       res.redirect('registration')
    }
})

module.exports = router;
