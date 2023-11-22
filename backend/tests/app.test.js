const model = require('../models/userModelMongoDb');
const app = require("../app");
const supertest = require("supertest");
const testRequest = supertest(app);

let mongod;
const { MongoMemoryServer } = require("mongodb-memory-server");
const { DatabaseError } = require('../models/DatabaseError');
const db = "user_tests";
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
jest.setTimeout(5000);

beforeAll(async () => {
    // This will create a new instance of "MongoMemoryServer" and automatically start it
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
    await mongod.stop(); // Stop the MongoMemoryServer
    console.log("Mock Database stopped");
});

// Profiles

test('POST /profiles success case', async () =>{
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    const result = await testRequest.post("/profiles").send({
        firstName: firstName,
        lastName: lastName,
        age: age,
        mostVisited: mostVisited,
        leastVisited: leastVisited,
        riskySites: riskySites,
        scamSites: scamSites

    }).set('Cookie', 'sessionId=27');

    expect(result.status).toBe(200);
    const addedProfile = await model.getProfile('27');

    expect(addedProfile.uniqueId == 27).toBe(true);
});

test('POST /profiles failure case', async() => {
    const firstName = "Bellamy";
    const lastName = "Blake";
    const invalidAge = 22;
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    const result = await testRequest.post("/profiles").send({
        firstName: firstName,
        lastName: lastName,
        age: invalidAge,
        mostVisited: mostVisited,
        leastVisited: leastVisited,
        riskySites: riskySites,
        scamSites: scamSites

    }).set('Cookie', 'sessionId=27');

    expect(result.status).toBe(500);
});

test('GET /profile success case', async () => {
    const id = 27;
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = '22';
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(id, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);

    const result = await testRequest.get("/profile").set('Cookie','sessionId=27');

    expect(result.status).toBe(200);
});

test('GET /profile failure case', async () => {
    const id = 27;
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = '22';
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(id, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);

    const result = await testRequest.get("/profile").set('Cookie','sessionId=28');

    expect(result.status).toBe(500);
});

test('GET /profiles success case', async () => {
    const id = 27;
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = '22';
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    await model.addProfile(id, firstName, lastName, age, mostVisited, leastVisited, riskySites, scamSites);

    const result = await testRequest.get("/profiles").set('Cookie','sessionId=27');

    expect(result.status).toBe(200);
});

test('PUT /profiles success case ', async () => {
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

     await testRequest.post("/profiles").send({
        firstName: firstName,
        lastName: lastName,
        age: age,
        mostVisited: mostVisited,
        leastVisited: leastVisited,
        riskySites: riskySites,
        scamSites: scamSites

    }).set('Cookie', 'sessionId=27');

    const newLastName = "Bob";
    const result = await testRequest.put("/profiles").send({
        newFirstName: firstName,
        newLastName: newLastName,
        newAge: age,
        newMostVisited: mostVisited,
        newLeastVisited: leastVisited,
        newRiskySite: riskySites,
        newScamSite: scamSites
    }).set('Cookie','sessionId=27');

    expect(result.status).toBe(200);
    const collection = await model.getProfileCollection();
    const cursor = await collection.find();
    const results = await cursor.toArray();
    expect(results[0].lastName == newLastName).toBe(true);


});


test('PUT /profiles failure case ', async () => {
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

    const newLastName = "Bob";
    const result = await testRequest.put("/profiles").send({
        newFirstName: firstName,
        newLastName: newLastName,
        newAge: age,
        newMostVisited: mostVisited,
        newLeastVisited: leastVisited,
        newRiskySite: riskySites,
        newScamSite: scamSites
    }).set('Cookie','sessionId=27');

    expect(result.status).toBe(400);

});

test('DELETE /profiles success case', async() =>{
    const firstName = "Bellamy";
    const lastName = "Blake";
    const age = "22";
    const mostVisited ="abc";
    const leastVisited = "def";
    const scamSites = [];
    const riskySites = [];

     await testRequest.post("/profiles").send({
        firstName: firstName,
        lastName: lastName,
        age: age,
        mostVisited: mostVisited,
        leastVisited: leastVisited,
        riskySites: riskySites,
        scamSites: scamSites

    }).set('Cookie', 'sessionId=27');

    const result = await testRequest.delete("/profiles").set('Cookie','sessionId=27');
    expect(result.status).toBe(200);

});

test('DELETE /profiles failure case', async() =>{
    
    const result = await testRequest.delete("/profiles").set('Cookie','sessionId=29');
    expect(result.status).toBe(500);

});




test('GET /users success case', async () => {
    const { username, password } = generateUserData();
    const url = "google.com"
    await model.addUser(username, password,url,'10');

    const testResponse = await testRequest.get("/users");
    expect(testResponse.status).toBe(200);
});

test('GET Invalid URL failure case', async () => {
    const testResponse = await testRequest.get("/z");
    expect(testResponse.status).toBe(404);
});

test("POST /users failure case for user error", async () => {
    const username = null;
    const password = "X";

    const testResponse = await testRequest.post("/users").send({
        username: username,
        password: password
    });
    expect(testResponse.status).toBe(400);
});

test("POST /users failure case for database error", async () => {
    const { username, password } = generateUserData();
    const testResponse = await testRequest.post("/users").send({
        username: username,
        password: password
    });
    await expect(model.initialize("bad URL", db, true)).rejects.toThrow(DatabaseError);
});

test('DELETE /users/:name failure case for user error', async () => {
    const { username, password } = generateUserData();
    const url = "google.com"
    await model.addUser(username, password,url,'10');

    const testResponse = await testRequest.delete("/users/" + "XYZ");
    expect(testResponse.status).toBe(400);
});

