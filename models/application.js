const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dormitory: { type: mongoose.Schema.Types.ObjectId, ref: 'Dormitory', default: null },
    applicationDate: { type: Date, required: true }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;