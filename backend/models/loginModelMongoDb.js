const { MongoClient } = require("mongodb");
const { InvalidInputError } = require("./InvalidInputError");
const { DatabaseError } = require("./DatabaseError");
const validateUtils = require("./validateUtils");
const logger = require('../logger');
const userModel = require("./userModelMongoDb");

let client;
let usersCollection;

function initialize(theUsersCollection) {
    usersCollection = theUsersCollection;
}

/**
 * Adds User to Database.
 * @param {string} username 
 * @param {string} password 
 * @returns Added User Object
 * @throws DatabaseError and InvalidInputError
 */
async function addUser(id, username, password) {
    const user = { uniqueId: id, username: username, password: password };
    try {
        await usersCollection.insertOne(user);
    }
    catch (err) {
        throw new DatabaseError("Could not add user to database");
    }
    return user;
}

/**
 * Gets a single User from Database.
 * @param {string} username 
 * @returns Username and Password of user found.
 * @throws DatabaseError and InvalidInputError
 */
async function getSingleUser(username) {
    try {
        var result = await usersCollection.findOne({ username: username });
    }
    catch (err) {
        const errorMessage = "Error searching for user in Database";
        logger.error(errorMessage);
        throw new DatabaseError(errorMessage);
    }

    if (result == null) {
        const errorMessage = "Could not find user in Database";
        logger.error(errorMessage);
        throw new InvalidInputError(errorMessage);
    }

    return { uniqueId: result.uniqueId, username: result.username, password: result.password };
}

/**
 * Gets all Users from Database.
 * @returns Array of user objects in Database
 */
async function getAllUsers() {
    const cursor = await usersCollection.find();
    const results = await cursor.toArray();

    return results;
}

/**
 * Closes the connection to the Database.
 */
async function close() {
    try {
        await client.close();
        logger.info("MongoDb connection closed");
    }
    catch (err) {
        logger.error(err.message);
    }
}

/**
 * Gets the collection of Users from the Database.
 * @returns Collection of Users in the Database.
 */
async function getCollection() {
    return usersCollection;
}

module.exports = { initialize, addUser, getSingleUser, getAllUsers, close, getCollection };