const Model = require('../models/podcastModel');
const router = require('express').Router();
router.post('/add', (req, res) => {
   
    console.log(req.body);

    //Create operation to save data in db
    new Model(req.body).save()
        .then((result) => {
            console.log(result);
        console.log("data saved")
            res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
})
   
router.get('/getall', (req, res) => {
    // res.send('response from podcast router at getall')
    Model.find({})
        .then((result) => {
            console.log(result);
            setTimeout(() => {
                res.json(result);
            }, 200);

        }).catch((err) => {
            console.log(err);
            res.json(err);
        });
});
     
router.get('/getbyid/:podcastid', (req, res) => {
    Model.findById(req.params.podcastid)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})

router.delete('/delete/:podcastid', (req, res) => {
    Model.findByIdAndDelete(req.params.podcastid)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})
router.put('/update/:podcastid', (req,res) => {
    Model.findByIdAndUpdate(req.params.podcastid,req.body,{new:true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    }); 
})

module.exports = router;