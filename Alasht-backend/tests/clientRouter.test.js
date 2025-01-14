const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const clientRouter = require('./routes/clientRouter'); // Adjust path accordingly

const app = express();

// Use JSON parser for requests
app.use(express.json());

// Use the router
app.use(clientRouter);

// Connect to the test database (you can use an in-memory database for testing)
beforeAll(async () => {
    const url = 'mongodb://localhost:27017/contractor' // Replace with your test DB URL
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Client Router Tests', () => {

    let userToken; // To store the user token for authenticated routes

    // Simulate a login to get the user token
    beforeAll(async () => {
        const loginResponse = await request(app)
            .post('/login') // Adjust according to your login route
            .send({
                username: 'pro8',
                password: '1234',
            });

        userToken = loginResponse.body.token; // Adjust according to the actual response structure
    });

    it('should create a new client profile', async () => {
        const newClient = {
            firstname: 'Mostafa',
            lastname: 'Zamamniturk',
            phone: '1234567890',
            email: 'mosizam@example.com',
            country: 'USA',
            state: 'California',
            city: 'San Jose',
            address: '123 Main St',
            zip: '90001',
        };

        const response = await request(app)
            .post('/client-complete-profile')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newClient);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'complete your profile');
    });

    it('should create a new project', async () => {
        const newProject = {
            name: 'New Project',
            services: 'Construction',
            description: 'Building a new structure',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            budget: 50000,
            location: 'New York',
            country: 'USA',
            state: 'New York',
            city: 'New York',
            zip: '10001',
        };

        const response = await request(app)
            .put('/projects')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newProject);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'New Project');
        expect(response.body).toHaveProperty('budget', 50000);
    });

    it('should fetch all projects', async () => {
        const response = await request(app)
            .get('/projects')
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return an error if a required field is missing for creating a project', async () => {
        const incompleteProject = {
            name: 'Incomplete Project',
            services: 'Design',
            // Missing required fields like description, budget, etc.
        };

        const response = await request(app)
            .put('/projects')
            .set('Authorization', `Bearer ${userToken}`)
            .send(incompleteProject);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('description is required to create a project');
    });

    it('should return 401 if the user is not authenticated', async () => {
        const response = await request(app)
            .get('/projects');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User not authenticated');
    });

    it('should return 403 if the user is not a client', async () => {
        // Mocking a user who is not a client
        const nonClientToken = 'someInvalidToken';

        const response = await request(app)
            .get('/projects')
            .set('Authorization', `Bearer ${nonClientToken}`);

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied: Only clients can view these projects.');
    });

});

