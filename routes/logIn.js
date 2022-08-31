const express = require('express');
const router = express.Router();
const db = require('../models')
const passport = require('passport')

router.get('/logIn', (req,res) => {

   
    res.render('logIn')
})

router.post('/logIn', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/logIn'
}))

router.get('/logout', (req, res)=>{

    req.logout()
    res.redirect('/')
})


module.exports = router;
