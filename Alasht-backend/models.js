const mongoose = require('mongoose')

//make a schema

const ContractorSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4
    }, 
    firstname: {
    type: String,
    required: true,
    trim: true,
    },
    lastname: {
    type: String,
    required: true,
    trim: true,
    },
    company: {
    type: String,
    required: true,
    trim: true,
    },
    skills: {
    type: Array,
    required: true,
    },
    payment: {
    type: String, 
    default: 'By contract',
    required: true,
    trim: true,
    },
    phone: {
    type: Number,
    required: true,
    },
    email: {
    type: String,
    required: true,
    trim: true,
    },
    instagram: {
    type: String,
    required: false,
    trim: true,
    },
    country: {
    type: String, 
    default: 'USA',
    required: true,
    trim: true,
    },
    state: {
    type: String,
    required: false,
    trim: true,
    },
    city: {
    type: String,
    required: false,
    trim: true,
    },
    address:{
    type: String,
    required: false,
    trim: true,
    },
    zip: {
    type: String,
    required: true,
    trim: true,
    },
    rating: {
    type: Number,
    required: false,
    },
    review: {
    type: String,
    required: false,
    trim: true
    },
    createdDate: { 
    type: Date,
    required: true,
    default: Date.now
    }
}, {versionKey: false})

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    services: {
        type: Array,
        required: true,
        },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Under Review', 'Pending', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Under Review',
        required: true
    },
    // contractor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Contractor',
    //     default: null,
    //     required: false
    // },
    location: {
        type: String,
        required: false,
        trim: true
    },
    country: {
        type: String, 
        default: 'USA',
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
        },
    city: {
        type: String,
        required: true,
        trim: true,
        },
    zip: {
        type: String,
        required: true,
        trim: true
    },
    createdDate: { 
        type: Date,
        required: true,
        default: Date.now
    }
}, {versionKey: false})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        requires: true
    },
    passwordSalt: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }, 
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastLoginDate: {
        type: Date
    }
})

const Project = mongoose.model('Project', ProjectSchema)

const Contractor = mongoose.model('Contractor', ContractorSchema)

const User = mongoose.model('User', UserSchema)

module.exports = { Contractor, Project, User }