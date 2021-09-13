const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: true
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

    dialogs: {
        type: Array,
        default: []
    },

    online: {
        type: Boolean,
        default: true
    },

    registrationDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('user', userSchema);