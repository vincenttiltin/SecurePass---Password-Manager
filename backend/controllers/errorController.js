const express = require('express');
const router = express.Router();
const routeRoot = '/';

module.exports = {
    router,
    routeRoot
}

/**
 * Displays error page if an invalid endpoint is provided
 * @param {*} request Request with body containing username and password.
 * @param {*} response Response 200 on success, 400 on user error and 500 on database error.
 */
function showError(request, response)
{
    response.status(404);
    response.send("Invalid URL entered. Please try again.");
}
router.get("*", showError); // Define endpoint