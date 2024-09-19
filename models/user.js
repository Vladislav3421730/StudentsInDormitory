const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {type: String,require:true},
    age: { type: Number, required: true },
    course: { type: Number, required: true },
    role: { type: String, required: true },
    settlementStatus: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
