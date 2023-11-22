const uuid = require('uuid');
const model = require("../models/loginModelMongoDb");

// Each session contains the username of the user and the time at which it expires
//  This object can be extended to store additional protected session information
class Session {
    constructor(username, expiresAt) {
        this.username = username
        this.expiresAt = expiresAt
    }
    // We'll use this method later to determine if the session has expired
    isExpired() {
        this.expiresAt < (new Date())
    }
}

// This object stores the users sessions. For larger scale applications, you can 
//   use a database or cache for this purpose
const sessions = []
async function createSession(username, numMinutes) {
    const user = await model.getSingleUser(username);
    // Generate a random UUID as the sessionId
    const sessionId = user.uniqueId;
    // Set the expiry time as numMinutes (in milliseconds) after the current time
    const expiresAt = new Date(Date.now() + numMinutes * 6000000000);

    // Create a session object containing information about the user and expiry time
    const thisSession = new Session(username, expiresAt);

    // Add the session information to the sessions map, using sessionId as the key
    sessions[sessionId] = thisSession;
    return sessionId;
}

function getSession(sessionId) {
    return sessions[sessionId];
}

function deleteSession(sessionId) {
    delete sessions[sessionId];
}

module.exports = { Session, createSession, getSession, deleteSession };