const express = require('express')
const passport = require('passport')
const crypto = require('crypto')

const LocalStrategy = require('passport-local')

const { User } = require('../models')

const router = express.Router()

//... Configures Passport.js to use the LocalStrategy for authentication
passport.use(
    new LocalStrategy(async function verify(username, password, callback) {
        try {
            //... Finds a user in the database with the given username
            const user = await User.findOne({ username })

            //... If the user is not found, return an error message
            if (!user) {
                return callback(null, false, { message: 'Incorrect username or password.'})
            }

            //... Hashes the provided password and compares it with the stored password hash
            crypto.pbkdf2(
                password, 
                Buffer.from(user.passwordSalt, 'base64'), 
                310000, 
                32, 
                'sha256', async function (error, hashedPassword) {
                if (error) {
                    return callback(error)
                }
                //... If the hashed passwords do not match, return an error message
                if (!crypto.timingSafeEqual(Buffer.from(user.passwordHash, 'base64'), hashedPassword)) {
                    return callback(null, false, { message: 'Incorrect username and password.'})
                }
                //... If the passwords match, authentication is successful and the user is returned
                return callback(null, user)
            })
        } catch(error) {
            return callback(error)
        }

}))

//... Serializes the user information into the session
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, {
            id: user._id,
            username: user.username
        })
    })
})

//... Deserializes the user information from the session
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    })
})

// Registration Route
router.post('/auth/register', async (req, res, next) => {
    const { username, password, userType, message } = req.body

    if (!username || !password || !userType) {
        return res.status(400).json({ error: 'Username, password, and userType are required.' });
    }

    if (!['client', 'contractor'].includes(userType)) {
        return res.status(400).json({ error: 'Invalid userType. Must be either client or contractor.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ error: 'Username already exists.' });
    }

    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (error, hashedPassword) => {
        if (error) {
            return next(error);
        }

        try {
            const newUser = await User.create({
                username,
                passwordSalt: salt.toString('base64'),
                passwordHash: hashedPassword.toString('base64'),
                userType
            })

            res.status(201).json({ message: 'User created successfully.', userId: newUser._id });
        } catch (error) {
            next(error)
        }
    })
})

// Login Route
router.post(
    '/auth/login',
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/home/login.html'
    })
)

// //... Handles the user reset password process
// router.post('/forgotPassword', async (req, res, next) => {
//     res.redirect('/app/resetPassword.html'); // Redirects to the reset password page
// });

// Logout Route
router.post('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect('/home/login.html');
    });
});

module.exports = router