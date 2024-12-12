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

router.put('/projects', async (req, res) => {})

router.patch('/projects/:id', async (req, res) => {})

router.delete('/projects/:id', async (req, res) => {})