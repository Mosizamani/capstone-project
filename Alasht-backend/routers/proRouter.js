const express = require('express')

const { Contractor } = require('../models')

const router = express.Router()

router.get('/contractors', async (req, res) => {
    const contractors = await Contractor.find({
        user: req.user._id
    })
    return res.status(200).json(contractors)
})

router.get('/user-info', async (req, res) => {})

router.get('/contractors/:id', async (req, res) => {})

router.put('/contractors', async (req, res) => {})

router.patch('/contractors/:id', async (req, res) => {})

router.delete('/contractors/:id', async (req, res) => {})

module.exports = router