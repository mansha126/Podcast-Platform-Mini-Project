const { Schema, model } = require('../connection');
const otpschema = new Schema({
    email: String,
    code: String,
    expireIn:Number
});

module.exports = model('otp', otpschema,'otp');