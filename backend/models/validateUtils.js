const validator = require("validator");

/**
 * Check to see if the given username is non-empty and comprised of 
 *   only letters, and the given password is non-empty
 * @param {string} username
 * @param {string} password
 * @returns true if both username and password are valid. false otherwise
 */
function isValid(username, password) {
  if (!username || !validator.isAlpha(username) || !password) {
    return false;
  }
  return true;
}

function isValidProfile(firstName, lastName, age, riskySites, scamSites)
{
  if(!validator.isAlpha(firstName)|| !validator.isAlpha(lastName)|| !validator.isAlphanumeric(age)|| !Array.isArray(riskySites) || !Array.isArray(scamSites))
  {
    return false;
  }
  return true;
}

function checkVisited(site)
{
  if(!site){
    site = "unspecified";
  }
  return site;
  
}





module.exports = { isValid, isValidProfile, checkVisited};