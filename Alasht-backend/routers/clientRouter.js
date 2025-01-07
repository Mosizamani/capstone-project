const express = require('express')

const { Project, Client } = require('../models')

const router = express.Router()

router.get('/user-info', async (req, res) => {})

router.get('/projects/:id', async (req, res) => {

})

router.get('/projects', async (req, res) => {

    const projects = await Project.find({ 
        user: req.user.id
    }) // Fetch projects for the logged-in user
    res.status(200).json(projects)

    try {

        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (req.user.userType !== 'client') {
            return res.status(403).json({ message: 'Access denied: Only clients can view these projects.' });
        }

    } catch (error) {
        console.error('Error fetching projects', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.put('/projects', async (req, res) => {



    console.log(req.body)
    console.log("Project data received!")

    const requiredFields = [
        "name", "services", "description", "startDate", "budget",
        "location", "country", "state", "city", "zip"
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ message: `${field} is required to create a project` });
        }
    }

    console.log(req.user)

    try {
        const project = await Project.create({
            name: req.body.name,
            services: req.body.services,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            budget: req.body.budget,
            status: req.body.status,
            location: req.body.location,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            zip: req.body.zip,
            user:mongoose.Types.ObjectId(req.user.id),
            // contractor: req.body.contractor,
            createdDate: req.body.createdDate
        })
        return res.status(201).json(project)
    } catch (error) {
        console.error('Error creating project',error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.patch('/projects/:id', async (req, res) => {})

router.delete('/projects/:id', async (req, res) => {})

router.post('/client-complete-profile', (req, res) => {
    return res.status(200).json({
        message: "complete your profile"
    })
})

router.post('/new-projects', (req, res) => {
    return res.status(200).json({
        message: "complete your profile"
    })
})

router.post('/edit-profile', async (req, res) => {
    console.log(req.body)
    console.log("Profile data received!")

    if(!req.body.firstname) {
        return res.status(400).json({ message:'First name is required to create a client' })
    }
    if(!req.body.lastname) {
        return res.status(400).json({ message:'Last name is required to create a client' })
    }
    if(!req.body.phone) {
        return res.status(400).json({ message:'Phone number is required to create a client' })
    }
    if(!req.body.email) {
        return res.status(400).json({ message:'Email is required to create a client' })
    }
    if(!req.body.country) {
        return res.status(400).json({ message:'Country is required to create a client' })
    }
    if(!req.body.state) {
        return res.status(400).json({ message:'State is required to create a client' })
    }
    if(!req.body.city) {
        return res.status(400).json({ message:'City is required to create a client' })
    }
    if(!req.body.address) {
        return res.status(400).json({ message:'Address is required to create a client' })
    }
    if(!req.body.zip) {
        return res.status(400).json({ message:'Zip code is required to create a client' })
    }

    try {
        const client = await Client.create({
            // user: req.user._id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            zip: req.body.zip,
            createdDate: req.body.createdDate
        })
        return res.status(201).json(client)
    } catch (error) {
        console.error('Error creating client',error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router