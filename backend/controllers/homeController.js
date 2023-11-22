const express = require('express');
const router = express.Router();
const routeRoot = '/';

module.exports = {
    router,
    routeRoot
}

/**
 * Displays home page for root endpoint.
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
function showHome(request, response) {
    response.status(200);
    response.send("Welcome to the home page.");
}
router.get("/", showHome); // Define endpoint
