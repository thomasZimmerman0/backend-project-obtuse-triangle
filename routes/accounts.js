const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

router.get('/accounts',auth, async (req,res) => {

    const users = await db.users.findAll({})


    res.render('accounts', {
        user : req.user,
        configName : "dfprnrmct",
        users : users
    })
})

module.exports = router;
