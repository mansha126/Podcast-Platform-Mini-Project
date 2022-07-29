const { Schema, model } = require('../connection');
const myschema = new Schema({
    username: String,
    password: String,
    email: String,
    confirmPassword: String,
    avatar: String,
});

module.exports = model('usercollection', myschema);