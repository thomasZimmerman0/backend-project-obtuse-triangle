const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models')

router.get('/registration', (req,res) => {

    res.render('registration',{
        user : req.user
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
