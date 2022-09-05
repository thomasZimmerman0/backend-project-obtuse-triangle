const express = require('express');
const router = express.Router();
let db = require('../models')

router.get('/draw', (req,res) => {

   
    res.render('draw', {
        user : req.user
    })
})

router.post('/draw', async (req,res) => {

    try {
        let{ID, title, body, userID} = req.body;
        let existCheck = await db.drawings.findByPk(ID);
        if(existCheck){
            let updateDrawing = await db.drawings.update({ title: title, body: body}, {
                where: {
                    id: ID
                }
            })
        }
        else{
            let insertRecord = await db.drawings.create({
                title: title, 
                body: body,
                userID: userID,
                is_published: false
            })
        }
    } 
    catch (error) {
        console.log(error)
    }
})

module.exports = router;