const { Schema, model } = require('../connection');
const myschema = new Schema({
    username: String,
    password: String,
    email: String,
});
//user tell that in databse create a connection nname in database
module.exports = model('usercollection', myschema);