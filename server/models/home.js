const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
    heaterIsOn: Number,
    acIsOn: Boolean,
    soundIsTooLoud: Boolean,
    light: Number
})

homeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('home', homeSchema, 'home')