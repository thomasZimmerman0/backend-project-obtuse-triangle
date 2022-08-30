const express = require('express');
const router = express.Router();

router.get('/logIn', (req,res) => {

   
    res.render('logIn')
})


module.exports = router;
