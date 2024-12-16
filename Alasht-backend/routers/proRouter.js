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

router.get('/pro-dashboard', (req, res) => {
    res.json({ message: "Welcome to the Pro Dashboard!" });
})

router.get('/contractors/:id', async (req, res) => {})

router.put('/contractors', async (req, res) => {

    console.log("Received data:", req.body)

    if(!req.body.firstname) {
        return res.status(400).json({ message:'First name is required to create a contractor' })
    }
    if(!req.body.lastname) {
        return res.status(400).json({ message:'Last name is required to create a contractor' })
    }
    if(!req.body.company) {
        return res.status(400).json({ message:'Company is required to create a contractor' })
    }
    if(!req.body.skills) {
        return res.status(400).json({ message:'At least one skill is required to create a contractor' })
    }
    if(!req.body.payment) {
        return res.status(400).json({ message:'Payment method is required to create a contractor' })
    }
    if(!req.body.phone) {
        return res.status(400).json({ message:'Phone number is required to create a contractor' })
    }
    if(!req.body.email) {
        return res.status(400).json({ message:'Email is required to create a contractor' })
    }
    if(!req.body.zip) {
        return res.status(400).json({ message:'Zip code is required to create a contractor' })
    }

    try {
        const contractor = await Contractor.create({
            // user: req.user._id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            company: req.body.company,
            skills: req.body.skills,
            payment: req.body.payment,
            phone: req.body.phone,
            email: req.body.email,
            country: req.body.country,
            zip: req.body.zip,
            createdDate: req.body.createdDate
        })
        return res.status(201).json(contractor);
    } catch (error) {
        console.error('Error creating contractor:', error)
        return res.status(500).json({ message: 'Internal server error' });
    }

})

router.patch('/contractors/:id', async (req, res) => {})

router.delete('/contractors/:id', async (req, res) => {})

module.exports = router