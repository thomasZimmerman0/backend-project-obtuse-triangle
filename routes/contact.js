const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/contact',auth, (req,res) => {

    res.render('contact', {

        user: req.user
    })
})


module.exports = router;