const { MongoClient, Int32 } = require("mongodb");
const { InvalidInputError } = require("./InvalidInputError");
const { DatabaseError } = require("./DatabaseError");
const validateUtils = require("./validateUtils");
const logger = require('../logger');
const { throws } = require("assert");
const loginModel = require("./loginModelMongoDb");
var SimpleCrypto = require("simple-crypto-js").default

let client;
let usersCollection;
let profileCollection;

/**
 * Connect up to the online MongoDb database with the name stored in dbName
 * @param {string} dbName 
 * @param {bool} resetFlag 
 * @param {string} url 
 * @throws DatabaseError
 */
async function initialize(url, dbName, resetFlag) {
    try {
        logger.debug("MongoClient URL: " + url);
        //logger.trace("Database Name " + dbName);
        client = new MongoClient(url); // store connected client for use while the app is running
        await client.connect();
        logger.info("Connected to MongoDb");

        db = client.db("user_db");
        usersCollection = db.collection("logins");
        loginModel.initialize(usersCollection);
        passwordCollection = db.collection("passwords");
        profileCollection = db.collection("profiles");
        // Check to see if the users collection exists
        collectionCursor = await db.listCollections({ name: "passwords" });
        collectionArray = await collectionCursor.toArray();

        if (resetFlag && collectionArray.length > 0) {
            await db.collection("logins").drop();
            await db.collection("passwords").drop();
            await db.collection("profiles").drop();
        }

        if (collectionArray.length == 0 || resetFlag) {
            // collation specifying case-insensitive collection
            const collation = { locale: "en", strength: 1 };
            // No match was found, so create new collection
            await db.createCollection(dbName, { collation: collation });
        }
    } catch (err) {
        const errorMessage = "Error connecting to database.";
        logger.error(errorMessage);
        throw new DatabaseError(errorMessage);
    }
}



// PROFILES

/**
 * Adds a profile to the profile collection with user information. All fields execpt uniqueId are given by the user.
 * @param {Int32} id - the unique id of the user stored in a cookie
 * @param {String} firstName - the first name of the user
 * @param {String} lastName - the last name of the user
 * @param {String} age - the age of the user
 * @param {String} mostVisited - the users most visited website
 * @param {String} leastVisited - the users least visited website
 * @param {Array} riskySites - an array of potentially risk websites the user visits
 * @param {Array} scamSites  - an array of potential scam websites the user visits
 * @returns The newly created profile object
 * @throws InvalidInputError if the user does not supply valid fields, 
 * or DatabaseError if unable to create profile.
 */
async function addProfile(id,firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites)
{
    mostVisited = validateUtils.checkVisited(mostVisited);
    leastVisited = validateUtils.checkVisited(leastVisited);

    if(!validateUtils.isValidProfile(firstName, lastName, age, riskySites, scamSites))
    {
        const errorMessage = "Error, Invalid User Input";
        logger.error(errorMessage);
        throw new InvalidInputError(errorMessage);
    }
    else
    {
        try
        {
            
            const profile = {uniqueId: id, firstName: firstName, lastName: lastName, age: age, 
                mostVisited: mostVisited, leastVisited: leastVisited, riskySites: riskySites,scamSites: scamSites};
            
            await profileCollection.insertOne(profile);
            return profile;


        } catch(err)
        {
            throw new DatabaseError("Error inserting porfile into Database");
        }
    }

}

/**
 * Retreives the users profile based on their unique id number.
 * @param {*} id - the unqiue id number of the user
 * @returns - the user's profile object
 * @throws InvalidInputError if the incorrect id number is supplied, DatabaseError if unable to retreive profile.
 */
async function getProfile(id)
{
    try
    {
        let result =  await profileCollection.findOne({uniqueId: id});

        if(result == null)
        {
            const errorMessage = "Could not find profile in Database";
            logger.error(errorMessage);
            throw new InvalidInputError(errorMessage);
        }

        return result

    } catch(err)
    {
        const errorMessage = "Error finding profile into Database";
        logger.error(errorMessage);
        throw new DatabaseError(errorMessage);
    }
}

/**
 * Retreives all profiles linked to the users id number.
 * @param {*} id - the unique id number of the user
 * @returns - the array of user's profiles
 * @throws InvalidInputError if the id number is incorrect, DatabaseError if unable to retreive profiles.
 */

async function getAllProfiles(id)
{
    try
    {
        let cursor =  await profileCollection.find({uniqueId: id});
        const result = await cursor.toArray();
        
        if(result == null)
        {
            const errorMessage = "Could not find your profiles in the Database";
            logger.error(errorMessage);
            throw new InvalidInputError(errorMessage);
        }

        return result

    } catch(err)
    {
        const errorMessage = "Error finding profiles from the Database";
        logger.error(errorMessage);
        throw new DatabaseError(errorMessage);
    } 
}


/**
 * updates the content of a profile
 * @param {*} id 
 * @param {*} newFName 
 * @param {*} newLName 
 * @param {*} newAge 
 * @param {*} newMostVisited 
 * @param {*} newLeastVisited 
 * @param {*} newScamSite 
 * @param {*} newRiskySite 
 * @returns the unique id
 */
async function updateProfile(id, newFName, newLName, newAge, newMostVisited,newLeastVisited, newScamSite, newRiskySite)
{
    try
    {
        if(!newFName || !newLName || !newAge || !newMostVisited, !newLeastVisited || !newScamSite || !newRiskySite)
        {
            const errorMessage = "Error, Invalid User Input";
            logger.error(errorMessage);
            throw new InvalidInputError(errorMessage);
        }

        let result = await profileCollection.updateOne({uniqueId: id},
            { $set: { firstName: newFName, lastName: newLName, age: newAge, mostVisited: newMostVisited, leastVisited: newLeastVisited, scamSites: newScamSite, riskySites: newRiskySite }} );

        if (result.modifiedCount == 0) {
            const errorMessage = "Error, Invalid data sent";
            logger.error(errorMessage);
            throw new InvalidInputError(errorMessage);
        }

        return {uniqueId: id};

    } catch(err)
    {
        if(err instanceof InvalidInputError)
        {
            throw err;
        }
        const errorMessage = "Error, unable to update profile to database";
        logger.error(errorMessage);
        throw new DatabaseError(errorMessage);

    }
}

/**
 * Delete a user's profile based on their unique id number.
 * @param {*} id - the id of the profile to delete
 * @returns - an object with the id of the profile that was deleted
 * @throws InvalidInputError if the id number is incorrect, DatabaseError if unable to delete the profile.
 */
async function deleteProfile(id)
{
    try {
        let result = await profileCollection.deleteOne({ uniqueId: id });

        if (result.deletedCount == 0) {
            const errorMessage = "Invalid id, unable to delete profile from the database";
            logger.error(errorMessage);
            throw new InvalidInputError(errorMessage);
        }

        return {uniqueId: id};
    
    }
    catch (err) {
        const errorMessage = "Failed to delete profile from the database.";
        logger.error(errorMessage);
        throw new DatabaseError(errorMessage);
    }
    
}







/**
 * Adds User to Database.
 * @param {string} username 
 * @param {string} password 
 * @returns Added User Object
 * @throws DatabaseError and InvalidInputError
 */
async function addUser(username, password,url,id) {
    const simpleCrypto = new SimpleCrypto(id)
    const cipherText = simpleCrypto.encrypt(password)
    const user = { username: username, password: cipherText ,url: url,uniqueId: id };
    const userplain = { username: username, password: password ,url: url,uniqueId: id };
    if (validateUtils.isValid(user.username, user.password)) {
        try {
            await passwordCollection.insertOne(user);
        }
        catch (err) {
            throw new DatabaseError("Could not add user to database");
        }
        return userplain;
    }
    else {
        const errorMessage = "User to add is invalid.";
        logger.error(errorMessage);
        throw new InvalidInputError(errorMessage);
    }
}


/**
 * Updates User in Database.
 * @param {string} id 
 * @param {string} oldUsername 
 * @param {string} oldPassword 
 * @param {string} newUsername 
 * @param {string} newPassword 
 * @returns Updated User Object
 * @throws DatabaseError and InvalidInputError
 */
async function updateUser(oldUsername, oldPassword, newUsername, newPassword,id) {
    const simpleCrypto = new SimpleCrypto(id);
   

    if (validateUtils.isValid(newUsername, newPassword)) {
        const cipherText =  simpleCrypto.encrypt(newPassword);
        
        try {
            const result = await passwordCollection.updateOne({ username: oldUsername, uniqueId: id }, { $set: { username: newUsername, password: cipherText } });
                if (result.modifiedCount == 0) {
                    const errorMessage = "User to update is invalid.";
                    logger.error(errorMessage);
                    throw new InvalidInputError(errorMessage);
                }
            return getSingleUser(newUsername,id);
        }
        catch (err) {
            if(err instanceof InvalidInputError)
            {
                throw err;
            }
            const errorMessage = "Could not update user to database";
            logger.error(errorMessage);
            throw new DatabaseError(errorMessage);
        }
    }
    else {
        const errorMessage = "User to update is invalid.";
        logger.error(errorMessage);
        throw new InvalidInputError(errorMessage);
    }
}

/**
 * Deletes User from Database.
 * @param {string} username 
 * @throws DatabaseError and InvalidInputError
 */

async function deleteUser(username,id) {
    try {
        var result = await passwordCollection.deleteOne({ username: username , uniqueId: id});
    }
    catch (err) {
        const errorMessage = "Failed to delete user from the database.";
        logger.error(errorMessage);
        throw new DatabaseError(errorMessage);
    }
    if (result.deletedCount == 0) {
        const errorMessage = "User specified for deletion not found in database";
        logger.error(errorMessage);
        throw new InvalidInputError(errorMessage);
    }
    return {username: username};
}

/**
 * Gets a single User from Database.
 * @param {string} username 
 * @returns Username and Password of user found.
 * @throws DatabaseError and InvalidInputError
 */
async function getSingleUser(username,id) {

    try {
        
        var result = await passwordCollection.findOne({ username: username ,uniqueId: id});
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
    const simpleCrypto = new SimpleCrypto(id)
    const cipherText = simpleCrypto.decrypt(result.password)
    return {username : result.username, password : cipherText, url: result.url};
}

/**
 * Gets all Users from Database.
 * @returns Array of user objects in Database
 */
async function getAllUsers(id) {
   
    
    const cursor = await passwordCollection.find({ uniqueId: id });
    const results = await cursor.toArray();
    const key = id;
    const decrypted = results.map(function(user) { return clean(user, key)});

    return decrypted;
}

/**
 * decrypts the user password
 * @param {*} user a user object    
 * @param {*} id the encryption key
 * @returns  a decrytped user
 */
function clean(user,id){

    const simpleCrypto = new SimpleCrypto(id)
    const encrytped = user.password;
    const decrypted = simpleCrypto.decrypt(encrytped)

    user.password = decrypted;
    return user;
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
    return passwordCollection;
}

/**
 * Gets the collection of Profile from the Database.
 * @returns Collection of Profiles in the Database.
 */
async function getProfileCollection() {
    return profileCollection;
}

module.exports = { initialize, addUser, getSingleUser, getAllUsers, close, getCollection, updateUser, deleteUser ,
addProfile, getProfile, getAllProfiles, updateProfile, deleteProfile, getProfileCollection};