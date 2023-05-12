const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photourl: {
        type: String,
    }, 
    ispremiumuser: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);
