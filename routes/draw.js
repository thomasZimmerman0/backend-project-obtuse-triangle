const express = require('express');
const router = express.Router();

router.get('/draw', (req,res) => {

   
    res.render('draw')
})


module.exports = router;