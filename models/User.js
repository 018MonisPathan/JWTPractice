const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
});

mongoose.model('User', UserSchema);