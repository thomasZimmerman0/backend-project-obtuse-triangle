const express = require('express');
const router = express.Router();

router.get('/test', (req,res) => {

   
    res.render('test')
})


module.exports = router;