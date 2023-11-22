const express = require("express");
const router = express.Router();
const routeRoot = "/login";
const validator = require('validator');
const model = require("../models/loginModelMongoDb");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuid = require('uuid');
const logger = require('../logger');
const { DatabaseError } = require('../models/DatabaseError');
const { InvalidInputError } = require('../models/InvalidInputError');

const users = [];
users['admin'] = 'abcd1234'; // create admin user with password abcd1234

/** Returns true if there is a stored user with the same username and password. */
async function checkCredentials(username, password) {
    const user = await model.getSingleUser(username);
    const isSame = await bcrypt.compare(password, user.password);
    return isSame;
}

/**
 * Handles GET requests at /:username endpoint by displaying if the user is found along with the username and password.
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
async function getSingleUser(request, response) {
    try {
        let username = request.params.username;

        const result = await model.getSingleUser(username);

        response.status(200);
        response.send(result);
    }
    catch (err) {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to find user: " + err.message
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to find user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(400);
            const errorMessage = "Unexpected error trying to find user" + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
}
router.get("/:username", getSingleUser); // Define endpoint

/**
 * function to register a new user into the login collection
 @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 * @returns 
 */
async function registerUser(request, response) {
    try {
        const username = request.body.username;
        const password = request.body.password;

        if (username && password) {
            const userExists = users[username];

            if (userExists) {
                response.status(400);
                response.send("Invalid registration - username " + username + " already exists.");
            } else {
                const uniqueId = uuid.v4();
                hashedPassword = await bcrypt.hash(password, saltRounds);
                model.addUser(uniqueId, username, hashedPassword);
                console.log("Successfully registered username " + username);
                response.send({ success: true });
                return;
            }
        }
        else {
            response.status(400);
            response.send("Unsuccessful registration: Empty username or password.");
        }
    } catch (error) {
        response.status(500);
        response.send("Unsuccessful registration: An unexpected error occurred during registration");
    }
    response.send({ success: false });
}
router.post("/register", registerUser);

module.exports = { router, routeRoot, checkCredentials, registerUser, getSingleUser};