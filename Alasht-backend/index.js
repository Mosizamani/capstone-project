// getting-started.js
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4001
const sessionSecret = process.env.SESSION_SECRET
const mongodbUrl = process.env.DATA_BASE_URL
const isProduction = process.env.NODE_ENV === 'production';


// const loggedIn = (req, res, next) => {
//     if (req.user) {
//         next()
//     } else {
//         res.redirect('/')
//     }
// }

const proRouter = require('./routers/proRouter')
const clientRouter = require('./routers/clientRouter')
const authRouter = require('./routers/authRouter')

// Middleware
app.use(express.json())
app.use(express.static('./Alasht-frontend'))
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
}))

app.use(session({
    secret: sessionSecret,  //... Secret key for signing the session ID cookie
    resave: false,  //... Do not save session if unmodified
    saveUninitialized: false,  //... Do not create session until something is stored
    store: MongoStore.create({
        mongoUrl: mongodbUrl, // Your MongoDB connection URL
        collectionName: 'sessions', // Optional: specify a collection name
    }),
    cookie: { 
        // secure: false,
        httpOnly: true,  // Helps prevent XSS attacks
        secure: isProduction,  //... Set to `true` if using HTTPS
        maxAge: 1000 * 60 * 60 * 24  //... Session cookie expires in 24 hours
    }
}))

//... Initialize Passport.js to handle user sessions
app.use(passport.initialize())
app.use(passport.session())

// Routers
app.use(proRouter)
app.use(clientRouter)
app.use(authRouter)

// Global error Handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
})

//... Function to start the application
const start = async () => {
    try {
        //... Connect to the MongoDB database
        await mongoose.connect(mongodbUrl)

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