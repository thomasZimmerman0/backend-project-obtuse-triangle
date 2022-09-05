const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')
const auth = require('../auth')

router.get('/draw', (req,res) => {

    res.render('draw', {
        user : req.user,
    })
})

router.get('/draw/:id', async(req,res) => {

    const drawingID = req.params.id
   
    const drawing = await db.drawing.findByPk(drawingID)

    res.render('draw', {
        user : req.user,
        drawing : drawing
    })
})

router.post('/draw', auth, async (req,res) => {

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
                userID: req.user.id,
                is_published: false
            })
        }

    catch (error) {
        console.log(error)
    }
})

module.exports = router;