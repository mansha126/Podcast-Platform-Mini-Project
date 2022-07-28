const mongoose = require('mongoose');
const url = "mongodb+srv://tiwarim:tiwarim@cluster0.y8n33.mongodb.net/podcastapp?retryWrites=true&w=majority";

//promise
mongoose.connect(url)
.then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.error(err);
});

module.exports = mongoose;