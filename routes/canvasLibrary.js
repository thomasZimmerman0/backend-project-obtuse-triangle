const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')


router.get('/drawings/', auth, async (req, res)=>{
        let selectedID = req.params.id
    try {
        const drawings = await db.drawings.findAll({where:{userID: selectedID}})
        console.log(drawings)
        res.render('canvasLibrary', {
            drawings: drawings
        })
    } 
    catch (error) {
        res.render('canvasLibrary', {
            drawings: false
        })
    }


    // if(drawings.length == 0){
    //     drawings[0] = 0
    // }
    // console.log(drawings)

})

router.post('/drawings/:id', async (req, res)=>{

    let drawing = req.params.drawing

    res.redirect('/'+drawing)
})


module.exports = router;
