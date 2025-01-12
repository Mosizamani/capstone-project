// getting-started.js
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4001
const sessionSecret = process.env.SESSION_SECRET
const mongodbUrl = process.env.DATA_BASE_URL
const isProduction = process.env.NODE_ENV === 'production'
const frontEndUrl = process.env.FRONT_END_URL


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
app.use(helmet())
app.use(express.json())
app.use(cors({
    origin: frontEndUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true,
}))

app.use(mongoSanitize())
app.use(xssClean())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    )
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    if (req.method === "OPTIONS") {
        return res.sendStatus(200)
    }
    next()
})

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
        sameSite: isProduction ? 'strict' : 'lax', // Prevent CSRF attacks
        maxAge: 1000 * 60 * 60 * 24  //... Session cookie expires in 24 hours
    }
}))

//... Initialize Passport.js to handle user sessions
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
})

// Routers
app.use(proRouter)
app.use(clientRouter)
app.use(authRouter)

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is running' })
})

// Global error Handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
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