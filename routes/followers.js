const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

router.get('/accounts', async (req,res) => {

    const user = await db.users.findAll({})


    res.render('accounts', {
        user : user
    })
})

module.exports = router;
