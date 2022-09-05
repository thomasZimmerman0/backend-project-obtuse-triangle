const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/', (req,res) => {

    if(req.isAuthenticated()){    

        res.render('index', {
        user : req.user
    })}

    res.render('index', {
        user: false})

    
})



module.exports = router;

