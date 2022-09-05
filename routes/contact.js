const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/contact',auth, (req,res) => {

    res.render('contact', {
<<<<<<< HEAD

        user: req.user
=======
        user:req.user
>>>>>>> f9eddb5 (mihoyminoy)
    })
})


module.exports = router;