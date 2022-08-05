const Model = require("../models/userModel")
const Otp = require("../models/otp")
const nodemailer =require("nodemailer")
//here router are import from express
const router = require("express").Router()

// all database operations are done in routers
//such as:
//add user
//fetch all user
//fetch user by id
//update user
//delete user
//authenticate user

//to add the data we use post request method
router.post("/add", (req, res) => {
  //Reading client data from request body
  console.log(req.body)

  //Create operation to save data in db
  new Model(req.body)
    .save()
    .then((result) => {
      console.log(result)
      console.log("data saved")
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})

router.get("/getall", (req, res) => {
  // res.send('response from user router at getall')
  Model.find({})
    .then((result) => {
      console.log(result)
      setTimeout(() => {
        res.json(result)
      }, 200)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})
router.get("/checkemail/:useremail", (req, res) => {
  console.log(req.params.useremail)
  Model.findOne({ email: req.params.useremail })
    .then((result) => {
      console.log(result)
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})
router.get("/getbyid/:userid", (req, res) => {
  Model.findById(req.params.userid)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err)
      res.json(err)
    })
})

router.get("/getbyemail/:email", (req, res) => {
  Model.findOne({ email: req.params.email })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete("/delete/:userid", (req, res) => {
  Model.findByIdAndDelete(req.params.userid)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err)
      res.json(err)
    })
})
router.put("/update/:userid", (req, res) => {
  Model.findByIdAndUpdate(req.params.userid, req.body, { new: true })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err)
      res.json(err)
    })
})
router.post("/authenticate", (req, res) => {
  Model.findOne({ email: req.body.email, password: req.body.password })
    .then((userdata) => {
      if (userdata) {
        res.status(200).json(userdata)
      } else {
        res.status(400).json({ message: "Invalid Credentials" })
      }
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})

//resetpassword
// 1. check email is correct or not
router.post('/email-send', (req, res) => {
 let data= Model.findOne({ email: req.body.email });
  console.log(data);
  const responseType = {};
  //if email exists in Model table then generate otp here 4 no. random otp generated and save otpData and pass msg
    if(data) {
      let otpCode = Math.floor((Math.random() * 10000) + 1);
        let otpData = new Otp({
          email: req.body.email,
          code: otpCode,
          expireIn: new Date().getTime() + 300 * 1000
        })
        let otpResponse = otpData.save();
      responseType.statusText = "Success";
      responseType.message = "Please Check Your Email Id";
      } else {
      responseType.statusText = "Error";
      responseType.message = "Email Id not Exist";
      }
  
  res.status(200).json(responseType);
})

//2. change password
//first check email and code in db if exists then check time
router.post('/change-password', (req, res) => {
  let data = Otp.find({ email: req.body.email, code: req.body.otpCode });
  const response = {}
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn.currentTime;
    if (diff < 0) {
      responseType.statusText = "Error";
      responseType.message = "Token Expire";
    } else {
      let user = Model.findOne({ email: req.body.email })
      user.password = req.body.password;
      user.save();
      responseType.statusText = "success";
      responseType.message = "Password changed successfully";
    }
  } else {
    responseType.statusText = "Error";
      responseType.message = "Invalid Otp";
  }

  res.status(200).json(response)
})


const mailer = (email, otp) => {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: 'mansha@gmail.com',
      pass: "1234"
    }
  });
  var mailOptions = {
    from: "mansha@gmail.com",
    to: "ram@gmail.com",
    subject: "Sending Email",
    text: "Thank you!"
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:'+info.response)
    }
  })
}



module.exports = router
