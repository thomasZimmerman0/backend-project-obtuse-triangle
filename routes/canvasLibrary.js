const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')


router.get('/drawings', auth, async (req, res)=>{

    try {
        const drawings = await db.drawings.findAll({where:{userID: req.user.id}})

        let drawingsArr = []

        for(let i = 0; i < drawings.length; i++){

            drawingsArr.push(drawings[i].body.replaceAll(' ', '+'))
        }

        

        res.render('canvasLibrary', {
            user : req.user,
            drawings: drawingsArr,
            loggedIn: true
        })
    } 
    catch (error) {
        res.render('canvasLibrary', {
            user : req.user,
            drawings: false,
            loggedIn: true,
        })
    }
})
// router.post('/drawings/:id', async (req, res)=>{

//     let drawing = req.params.drawing
//     console.log(drawing)

//     res.redirect('/draw'+drawing)
// })


module.exports = router;
