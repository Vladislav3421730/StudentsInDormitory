const mongoose = require('mongoose');

const dormitorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    numberOfResidents: { type: Number, required: true }
});

const Dormitory = mongoose.model('Dormitory', dormitorySchema);

module.exports = Dormitory;
