// getting-started.js
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
// const session = require('express-session')
// const passport = require('passport')

require('dotenv').config()

const { Contractor } = require('./models')

const app = express()
const port = process.env.PORT || 4001

app.use(express.json())
app.use(express.static('front-end'))
app.use(cors({
    origin: process.env.FRONT_END_URL,
    Credentials: true
}))

// app.get('/pro-signup', async (req, res) => {
//     try {
//     // Ensure req.user is defined; otherwise, return an error response
//     if (!req.user) {
//         return res.status(400).json({ error: 'User not found in request' })
//     }

//     // Find contractors by the user
//     const contractors = await Contractor.find({ user: req.user })

//     // Return contractors as JSON response
//     return res.status(200).json(contractors)
//     } catch (error) {
//     console.error('Error fetching contractors:', error)
//     // Send a 500 Internal Server Error response if something goes wrong
//     return res.status(500).json({ error: 'Internal Server Error' })
//     }
// })


//... Function to start the application
const start = async () => {
    try {
        //... Connect to the MongoDB database
        await mongoose.connect(process.env.DATA_BASE_URL)

        //... Start the Express server on the specified port
        app.listen(port, () => {
            console.log(`Alasht Application backend is listening on port ${port}`)
        })
    } catch (error) {
        //... Log any errors that occur during startup and exit the process
        console.error(error)
        process.exit(1)
    }
}
start()