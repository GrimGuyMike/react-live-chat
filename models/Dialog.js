const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dialogSchema = new Schema({

    users: {
        type: Array,
        required: true
    },

    messages: {
        type: Array,
        default: []
    }

});

module.exports = Dialog = mongoose.model('dialog', dialogSchema);