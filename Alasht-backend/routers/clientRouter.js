const express = require('express')

const { Project } = require('../models')

const router = express.Router()

router.get('/projects', async (req, res) => {
    const projects = await Project.find({
        user: req.user._id
    })
    return res.status(200).json(projects)
})

router.get('/user-info', async (req, res) => {})

router.get('/projects/:id', async (req, res) => {})

router.put('/projects', async (req, res) => {

    console.log(req.body)
    console.log("Project data received!")

    if(!req.body.name) {
        return res.status(400).json({ message:' field is required to create a project' })
    }
    if(!req.body.services) {
        return res.status(400).json({ message:'At least one service is required to create a project' })
    }
    if(!req.body.description) {
        return res.status(400).json({ message:'Description is required to create a project' })
    }
    if(!req.body.startDate) {
        return res.status(400).json({ message:'Start date is required to create a project' })
    }
    if(!req.body.budget) {
        return res.status(400).json({ message:'Budget is required to create a project' })
    }
    if(!req.body.location) {
        return res.status(400).json({ message:'Location is required to create a project' })
    }
    if(!req.body.country) {
        return res.status(400).json({ message:'Country is required to create a project' })
    }
    if(!req.body.state) {
        return res.status(400).json({ message:'State is required to create a project' })
    }
    if(!req.body.city) {
        return res.status(400).json({ message:'City is required to create a project' })
    }
    if(!req.body.zip) {
        return res.status(400).json({ message:'Zip code is required to create a project' })
    }

    try {
        const project = await Project.create({
            // user: req.user._id,
            name: req.body.name,
            services: req.body.services,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            budget: req.body.budget,
            status: req.body.status,
            // contractor: req.body.contractor,
            location: req.body.location,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            zip: req.body.zip,
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

module.exports = router