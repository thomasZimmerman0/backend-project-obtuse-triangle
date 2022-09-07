const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/contact', (req,res) => {

    res.render('contact', {
        user: req.user,
        loggedIn : false
    })
})


module.exports = router;