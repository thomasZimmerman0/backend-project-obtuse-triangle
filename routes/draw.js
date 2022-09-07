const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

router.get('/draw',auth, (req,res) => {

    res.render('draw', {
        user : req.user,
        drawing : false,
        loggedIn : true
    })
})

router.get('/draw/:id',auth, async(req,res) => {

    const drawingID = req.params.id
   
    const drawing = await db.drawing.findByPk(drawingID)

    res.render('draw', {
        user : req.user,
        drawing : drawing,
        loggedIn : true
    })
})

router.post('/draw', auth, async (req,res) => {

    try{
        console.log('working?')
        let{ID, title, body} = req.body;
        let existCheck = await db.drawings.findByPk(ID);
        if(existCheck){
            let updateDrawing = await db.drawings.update({ title: title, body: body}, {
                where: {
                    id: ID
                }
            })
        }
        else{
            console.log('create')
            let insertRecord = await db.drawings.create({
                title: title, 
                body: body,
                userID: req.user.id,
                is_published: false
            })
        }
    }

    catch (error) {
        console.log(error)
    }

})

module.exports = router;