const Model = require('../models/userModel');
//here router are import from express
const router = require('express').Router();

// all database operations are done in routers
//such as:
//add user
//fetch all user
//fetch user by id
//update user
//delete user
//authenticate user

//to add the data we use post request method
router.post('/add', (req, res) => {
    //Reading client data from request body
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
    // res.send('response from user router at getall')
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
    router.get('/checkemail/:useremail', (req, res) => {
        console.log(req.params.useremail);
        Model.findOne({ email: req.params.useremail })
        .then((result) => {
            console.log(result);
            res.json(result);
    
        }).catch((err) => {
            console.log(err);
            res.json(err);
        });
       
    })   
router.get('/getbyid/:userid', (req, res) => {
    Model.findById(req.params.userid)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})

router.delete('/delete/:userid', (req, res) => {
    Model.findByIdAndDelete(req.params.userid)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
})
router.put('/update/:userid', (req,res) => {
    Model.findByIdAndUpdate(req.params.userid,req.body,{new:true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    }); 
})
router.post('/authenticate', (req, res) => {
    Model.findOne({ email: req.body.email, password:req.body.password })
    .then((userdata) => {
        if (userdata) {
            res.status(200).json(userdata);
        } else {
            res.status(400).json({message:'Invalid Credentials'})
        }

    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
   
})   
module.exports = router;