const express = require('express');
const router = express.Router();

router.get('/draw2', (req,res) => {

   
    res.render('draw2')
})


module.exports = router;