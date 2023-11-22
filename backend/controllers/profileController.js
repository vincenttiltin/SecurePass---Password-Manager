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
 * Handles POST requests at /profiles endpoint by adding a new profile to the database using the provided body data and sessionId cookie.
 * @param {*} request Request with body containing first name, last name, age, most visited website, least visited website, risky websites , scam websites and sessionId cookie.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
router.post("/profiles", handleAddProfile);
async function handleAddProfile(request,response)
{
    try
    {
        let id = request.cookies.sessionId
        let firstName = request.body.firstName;
        let lastName = request.body.lastName;
        let age = request.body.age;
        let mostVisited = request.body.mostVisited;
        let leastVisited = request.body.leastVisited;
        let riskySites = request.body.riskySites
        let scamSites = request.body.scamSites;

        const result = await model.addProfile(id, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);

        if (result) {
            response.status(200);
            response.send(result);
        }
        else {
            response.status(500);
            const errorMessage = "Failed to add porfile for unknown reason.";
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }



    }
    catch(err)
    {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to add profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to add profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(500);
            const errorMessage = "Unexpected error trying to add profile" + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
}

/**
 * Handles GET requests at /profile endpoint by displaying if the profile is found 
 * @param {*} request Request with sessionId cookie representing the uniqueId of the profile to find
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
router.get("/profile", handleGetProfile)
async function handleGetProfile(request, response)
{
    try
    {
        let id = request.cookies.sessionId

        const result = await model.getProfile(id);

        if (result) {
            response.status(200);
            response.send(result);
        }
        else {
            response.status(500);
            const errorMessage = "Failed to get profile for unknown reason.";
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }

    }
    catch(err)
    {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to get profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to get profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(500);
            const errorMessage = "Unexpected error trying to get profile" + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }

    }

}

/**
 * Handles GET requests at /profiles endpoint by displaying all profiles assoicated with the uniqueId of the user
 * @param {*} request Request with sessionId cookie representing the uniqueId of the profile to find
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
router.get("/profiles", handleGetAllProfiles)
async function handleGetAllProfiles(request, response)
{
    try
    {
        let id = request.cookies.sessionId

        const result = await model.getAllProfiles(id);

        if (result) {
            response.status(200);
            response.send(result);
        }
        else {
            response.status(500);
            const errorMessage = "Failed to retreive profiles for unknown reason.";
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }

    }
    catch(err)
    {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to find profiles: " + err.message
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to find profiles: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(500);
            const errorMessage = "Unexpected error trying to find profiles: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }
  
}

/**
 * Handles PUT requests at /profiles endpoint by updating the profile specified with new values provided from the request body, if the sessionId is valid.
 * @param {*} request Request with body containing first name, last name, age, most visited website, least visited website, risky websites , scam websites and sessionId cookie.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
router.put("/profiles", handleUpdateProfile)
async function handleUpdateProfile(request, response)
{
    try
    {
        let id = request.cookies.sessionId;
        let newFirstName = request.body.newFirstName;
        let newLastName = request.body.newLastName;
        let newAge = request.body.newAge;
        let newMostVisited = request.body.newMostVisited;
        let newLeastVisited = request.body.newLeastVisited;
        let newScamSite = request.body.newScamSite;
        let newRiskySite = request.body.newRiskySite;

        const result = await model.updateProfile(id, newFirstName, newLastName, newAge, newMostVisited, newLeastVisited, newScamSite, newRiskySite);

        if (result) {
            response.status(200);
            response.send(result);
        }
        else {
            response.status(500);
            const errorMessage = "Failed to update profile for unknown reason.";
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }

    }
    catch(err)
    {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to update profile: " + err.message
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to update profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(500);
            const errorMessage = "Unexpected error trying to update profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
    }

}

/**
 * Handles DELETE requests at /profiles endpoint by deleting the profile specified from the database.
 * @param {*} request Request containing the sessionId cookie representing the uniqueId of the profile to delete.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
router.delete("/profiles", handleDeleteProfile)
async function handleDeleteProfile(request, response)
{
    try
    {
        let id = request.cookies.sessionId

        const result = await model.deleteProfile(id);

        if (result) {
            response.status(200);
            response.send(result);
        }
        else {
            response.status(500);
            const errorMessage = "Failed to delete profile for unknown reason.";
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }

    }
    catch(err)
    {
        if (err instanceof DatabaseError) {
            response.status(500);
            const errorMessage = "System error trying to delete profile: " + err.message
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else if (err instanceof InvalidInputError) {
            response.status(400);
            const errorMessage = "Validation error trying to delete profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }
        else {
            response.status(500);
            const errorMessage = "Unexpected error trying to delete profile: " + err.message;
            logger.error(errorMessage);
            response.send({errorMessage: errorMessage});
        }

    }
}