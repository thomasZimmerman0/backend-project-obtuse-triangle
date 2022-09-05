const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')


router.get('/drawings', auth, async (req, res)=>{
        let selectedID = req.params.id
    try {
        const drawings = await db.drawings.findAll({where:{userID: selectedID}})
        console.log(drawings)
        res.render('canvasLibrary', {
            user : req.user,
            drawings: drawings
        })
    } 
    catch (error) {
        res.render('canvasLibrary', {
            user : req.user,
            drawings: false
        })
    }


    // if(drawings.length == 0){
    //     drawings[0] = 0
    // }
    // console.log(drawings)

})

// router.post('/drawings/:id', async (req, res)=>{

//     let drawing = req.params.drawing
//     console.log(drawing)

//     res.redirect('/draw'+drawing)
// })


module.exports = router;
