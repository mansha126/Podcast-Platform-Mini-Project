const Otp = require("../models/otp");
const Model = require("../models/userModel");

const router = require("express").Router();

router.post("/email-send", (req, res) => {
  let data = Model.findOne({ email: req.body.email });
  console.log(data);
  const responseType = {};
  //if email exists in Model table then generate otp here 4 no. random otp generated and save otpData and pass msg
  if (data) {
    let otpCode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpCode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = otpData.save();
    responseType.statusText = "Success";
    responseType.message = "Please Check Your Email Id";
  } else {
    responseType.statusText = "Error";
    responseType.message = "Email Id not Exist";
  }

  res.status(200).json(responseType);
});

//2. change password
//first check email and code in db if exists then check time
router.post("/change-password", (req, res) => {
  let data = Otp.find({ email: req.body.email, code: req.body.otpCode });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      responseType.statusText = "Error";
      responseType.message = "Token Expire";
    } else {
      let user = Otp.findOne({ email: req.body.email });
      user.password = req.body.password;
      user.save();
      responseType.statusText = "success";
      responseType.message = "Password changed successfully";
    }
  } else {
    responseType.statusText = "Error";
    responseType.message = "Invalid Otp";
  }

  res.status(200).json(response);
});

const mailer = (email, otp) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "mansha@gmail.com",
      pass: "1234",
    },
  });
  var mailOptions = {
    from: "mansha@gmail.com",
    to: "ram@gmail.com",
    subject: "Sending Email",
    text: "Thank you!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};

module.exports = router;
