const mongoose = require("mongoose");
const dbServerUrl = process.env.MONGODB_URL;

function dbConnection() {
    mongoose.set("strictQuery", true);
    mongoose.connect(dbServerUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to mongoDB successfully");
    })
    .catch(error => {
        console.log(`Something went wrong error code: ${error}`);
    })

}

module.exports = dbConnection