const express = require('express');
const router = express.Router();

router.get('/draw', (req,res) => {

   
    res.render('draw')
})

router.post('/draw', async (req,res) => {
    try {
        let{ID, title, body, userID} = req.body;
        let existCheck = await db.drawings.findByPK(ID);
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