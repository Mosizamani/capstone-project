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
    required: true,
    trim: true,
    },
    city: {
    type: String,
    required: true,
    trim: true,
    },
    address:{
    type: String,
    required: true,
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

const Contractor = mongoose.model('Contractor', ContractorSchema);

module.exports = { Contractor }