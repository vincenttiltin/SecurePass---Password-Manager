require ('dotenv').config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { DatabaseError } = require('../models/DatabaseError');
const { InvalidInputError } = require('../models/InvalidInputError');
const model = require('../models/userModelMongoDb');
const loginModel = require('../models/loginModelMongoDb');

jest.setTimeout(5000);

const userData = [
{ username: 'Benjamin', password: 'Energetic45' },
{ username: 'Oliver', password: 'notFunny123' },
{ username: 'Justin', password: 'IamJ77' },
{ username: 'James', password: 'logs88' },
{ username: 'Jacob', password: 'moneyGrowsOnTrees55' },
{ username: 'Benjamin', password: 'Energetic45' },
{ username: 'Oliver', password: 'notFunny123' },
{ username: 'Justin', password: 'IamJ77' },
{ username: 'James', password: 'logs88' },
{ username: 'Jacob', password: 'moneyGrowsOnTrees55' },
{ username: 'Jacob', password: 'moneyGrowsOnTrees55' },
{ username: 'Benjamin', password: 'Energetic45' },
{ username: 'Oliver', password: 'notFunny123' },
{ username: 'Justin', password: 'IamJ77' },
{ username: 'James', password: 'logs88' },
{ username: 'Jacob', password: 'moneyGrowsOnTrees55' },
{ username: 'Lucas', password: 'crayonsYellow9' }
];

const generateUserData = () => userData.splice(Math.floor((Math.random() * userData.length)), 1)[0];
const dbName = "testUser_db";

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    console.log("Mock Database started");
});

beforeEach(async () => {
    try {
        const url = mongod.getUri();
        await model.initialize(url, dbName, true);
     } catch (err) {
         console.log(err.message);
     }
});

afterEach(async () => {
    await model.close();
});

afterAll(async () => {
    await mongod.stop();
    console.log("Mock Database stopped");
});

test('Can add user to database', async () => {
    const { username, password } = generateUserData();
    const url = "google.com"
    await model.addUser(username, password, url,'10');

    const collection = await model.getCollection();
    const cursor = await collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].username.toLowerCase() == username.toLowerCase()).toBe(true);
    //expect(results[0].password == password).toBe(true);
});

test('Can read all users from database', async () => {
    const { username, password } = generateUserData();
    const url = "google.com"
    await model.addUser(username, password,url,'10');

    const { username: username2, password: password2 } = generateUserData();
    await model.addUser(username2, password2,url,'10');

    const results = await model.getAllUsers('10');

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(3);
    expect(results[1].username.toLowerCase() == username.toLowerCase()).toBe(true);
    expect(results[1].password == password).toBe(true);
    expect(results[2].username.toLowerCase() == username2.toLowerCase()).toBe(true);
    expect(results[2].password == password2).toBe(true);
});

test('Throws on adding null user to database', async () => {
    const username = null;
    const password = null;
    const url = "google.com"
    try{
        await model.addUser(username, password,url,'10');
    }
    catch(err) {
        expect(err).toBeInstanceOf(Error);
    }
});

test('Can read user from database', async () => {
    const { username, password } = generateUserData();
    const url = "google.com"
    await model.addUser(username, password,url,'10');

    const foundUser = await model.getSingleUser(username,'10');

    expect(username.toLowerCase() == foundUser.username.toLowerCase()).toBe(true);
    expect(password == foundUser.password).toBe(true);
});

test('Throws on reading a non-existent user from database.', async () => {
    const { username, password } = generateUserData();

    try{
        const foundUser = await model.getSingleUser(username,10);
    }
    catch (err) {
        expect(err).toBeInstanceOf(InvalidInputError);
    }
});

test('Can update user in database', async () => {
    const { username, password } = generateUserData();
    const url = "google.com"
    await model.addUser(username, password,url,'10');
    const newUsername = 'bot';
    const newPassword = 'pass123';
    await model.updateUser(username, password, newUsername, newPassword,'10');
});

test('Throws on updating user to an invalid state in database', async () => {
    const { username, password } = generateUserData();
    const url = "google.com"
    await model.addUser(username, password,url,'10');
    const newUsername = null;
    const newPassword = null;
    try{
        const newUser = await model.updateUser(0, username, password, newUsername, newPassword,'10');
    }
    catch(err) {
        expect(err).toBeInstanceOf(TypeError);
    }
});

test('Throws on deleting non-existent user from database', async () => {

    try{
        await model.deleteUser("Random",'10');
    }
    catch(err) {
        expect(err).toBeInstanceOf(InvalidInputError);
    }
});

// Login Model Tests

test('Can add login to login database', async () => {
    const { username, password } = generateUserData();
    const id = 1;
    await loginModel.addUser(id, username, password);

    const collection = await loginModel.getCollection();
    const cursor = await collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].username.toLowerCase() == username.toLowerCase()).toBe(true);
    expect(results[0].password == password).toBe(true);
});

test('Can read all users from login database', async () => {
    const { username, password } = generateUserData();
    const id1 = 1;

    await loginModel.addUser(id1, username, password);

    const { username: username2, password: password2 } = generateUserData();
    const id2 = 2;
    await loginModel.addUser(id2, username2, password2);

    const results = await loginModel.getAllUsers();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0].username.toLowerCase() == username.toLowerCase()).toBe(true);
    expect(results[0].password == password).toBe(true);
    expect(results[1].username.toLowerCase() == username2.toLowerCase()).toBe(true);
    expect(results[1].password == password2).toBe(true);
});

test('Throws on adding null user to login database', async () => {
    const username = null;
    const password = null;
    const id = 0;
    try{
        await loginModel.addUser(id, username, password);
    }
    catch(err) {
        expect(err).toBeInstanceOf(InvalidInputError);
    }
});

test('Can read user from login database', async () => {
    const { username, password } = generateUserData();
    const id = 1;

    await loginModel.addUser(id, username, password);

    const foundUser = await loginModel.getSingleUser(username);

    expect(username.toLowerCase() == foundUser.username.toLowerCase()).toBe(true);
    expect(password == foundUser.password).toBe(true);
});

test('Throws on reading a non-existent user from login database.', async () => {
    const { username, password } = generateUserData();

    try{
        const foundUser = await loginModel.getSingleUser(username);
    }
    catch (err) {
        expect(err).toBeInstanceOf(InvalidInputError);
    }
});

// Profiles tests

test("Test Delete Valid Profile", async () => {
    const uniqueId = 234;
    const firstName = "Finn";
    const lastName = "Collins";
    const age = "222";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(uniqueId, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);
    await model.deleteProfile(uniqueId);

    const collection = await model.getProfileCollection();
    const cursor = await collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
    
});

test("Test Create Valid Profile", async () => {

    const uniqueId = 27;
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    const result = await model.addProfile(uniqueId, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);

    const collection = await model.getProfileCollection();
    const cursor = await collection.find();
    const results = await cursor.toArray();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].uniqueId == uniqueId).toBe(true);
   
});

test("Test Create Invalid Profile", async () =>{
    const invalidId = null;
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const invalidScamSites = 9;
    const riskySites = [];

    try
    {
        const result = await model.addProfile(invalidId, firstName, lastName, age, mostVisited, leastVisited, riskySites, invalidScamSites);

    }
    catch(err) {
        expect(err).toBeInstanceOf(InvalidInputError);
    }
    
});

test("Test Read Valid Profile", async () => {

    const uniqueId = "606deffc-e40b-4124-bb24-c4f1581b8dbc";
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(uniqueId, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);
    const result = await model.getProfile(uniqueId);

    expect(uniqueId == result.uniqueId).toBe(true);
   
});

test("Test Read Invalid Profile", async () => {

    const uniqueId = 27;
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    try
    {
        const result = await model.getProfile(uniqueId);
    }
    catch (err) {
        expect(err).toBeInstanceOf(DatabaseError);
    }
   
});

test("Test Read All Profiles", async () => {
    const uniqueId = 23;
    const firstName = "Jasper";
    const lastName = "Jordan";
    const age = "222";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(uniqueId, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);
    const result = await model.getAllProfiles(uniqueId);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(uniqueId == result[0].uniqueId).toBe(true);
});


test("Test Update Valid Profile", async () => {

    const uniqueId = 289;
    const firstName = "Raven";
    const lastName = "Reyes";
    const age = "23";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(uniqueId, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);

    await model.updateProfile(uniqueId, firstName, lastName, "22", mostVisited, leastVisited,scamSites, riskySites);
    const collection = await model.getProfileCollection();
    const cursor = await collection.find();
    const results = await cursor.toArray();

    expect(results[0].age).toBe("22");
   
   
});

test("Test Update Invalid Profile", async () => {

    const uniqueId = 289;
    const firstName = "Raven";
    const lastName = "Reyes";
    const age = "23";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(uniqueId, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);

    const invalidId = 7;

    await expect(model.updateProfile(invalidId, firstName, lastName, age, mostVisited, leastVisited,scamSites, riskySites)).rejects.toThrow(InvalidInputError); 
    
});

test('Test Delete Invalid Profile', async () => {

    const uniqueId = 23;

    try
    {
        await model.deleteProfile(uniqueId);
      
    }
    catch(err) {
        expect(err).toBeInstanceOf(DatabaseError);
    }
});