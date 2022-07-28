const { Schema, model } = require('../connection')
const schema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    file: String,
    uploadedBy:String,
});

module.exports = model('podcastcollection', schema);