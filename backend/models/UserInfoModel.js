// models/DataModel.js
const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    userInfo:[
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    message: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user"

    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);
