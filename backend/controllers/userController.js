const express = require('express');
const { DatabaseError } = require('../models/DatabaseError');
const { InvalidInputError } = require('../models/InvalidInputError');
const model = require("../models/userModelMongoDb");
const router = express.Router();
const routeRoot = '/';
const logger = require('../logger');



module.exports = {
    router,
    routeRoot
}

/**
 * Handles POST requests at /users endpoint by adding a new user to the database using the provided body data.
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
async function handleAddUser(request, response) {
   
    try {
        let id = request.cookies.sessionId
        let username = request.body.username;
        let password = request.body.password;
        let url = request.body.url;
         
        const result = await model.addUser(username, password,url,id);

        if (result) {
            response.status(200);
            response.send(result);
        }
        else {
            response.status(400);
            const errorMessage = "Failed to add user for unknown reason.";
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
    catch (err) {
        if (err instanceof DatabaseError) {
            response.status(500);
            response.send("System error trying to add user: " + err.message);
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to add user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(400);
            const errorMessage = "Unexpected error trying to add user" + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
}
router.post("/users", handleAddUser); // Define endpoint

/**
 * Handles GET requests at /users endpoint by displaying all users to the console.
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
async function handleGetAllUsers(request, response) {
    try {
        let id = request.cookies.sessionId
        const allUsers = await model.getAllUsers(id);
        response.send(allUsers);
    }
    catch (err) {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to add user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to add user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(400);
            const errorMessage = "Unexpected error trying to add user" + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
}
router.get("/users", handleGetAllUsers); // Define endpoint

/**
 * Handles GET requests at /users/:username endpoint by displaying if the user is found along with the username and password.
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
async function handleGetUser(request, response) {
    try {
        let username = request.params.username;
        let id = request.cookies.sessionId
        const result = await model.getSingleUser(username,id);

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
router.get("/users/:username", handleGetUser); // Define endpoint

/**
 * Handles PUT requests at /users/:username endpoint by updating the user specified with a new username and password provided in the body data, if the old username and password provided are valid.
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
async function handleUpdateUser(request, response) {
    try {
        let id = request.cookies.sessionId
        let oldUsername = request.body.oldUsername;
        let newUsername = request.body.newUsername;
        let oldPassword = request.body.oldPassword;
        let newPassword = request.body.newPassword;

        const result = await model.updateUser(oldUsername, oldPassword, newUsername, newPassword,id);
        response.status(200);
        response.send(result);
    }
    catch (err) {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to update user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to update user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(400);
            const errorMessage = "Unexpected error trying to update user" + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
}
router.put("/users", handleUpdateUser);

/**
 * Handles DELETE requests at /users/:username endpoint by deleting the user specified from the database.
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
async function handleDeleteUser(request, response) {
    try {
        let id = request.cookies.sessionId
        let username = request.params.username;
        const result = await model.deleteUser(username,id);
        response.status(200);
        const message = "User with username " + username + " was successfully deleted from the database.";
        logger.info(message);
        response.send(result);
    }
    catch (err) {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to delete user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to delete user: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(400);
            const errorMessage = "Unexpected error trying to delete user" + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
}
router.delete("/users/:username", handleDeleteUser); // Define endpoint