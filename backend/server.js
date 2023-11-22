require("dotenv").config();
const app = require('./app.js');
const port = 1339;
const model = require("./models/userModelMongoDb");
const url = process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;

/**
 * Initializes connection to database and starts the server.
 */
model.initialize(url, "logins", false)
    .then(
        app.listen(port) // Run the server
    );