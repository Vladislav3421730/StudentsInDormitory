const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');
const registRoutes = require('./routes/register');
const editRoutes = require('./routes/dormitories');
const searchRoutes = require('./routes/admin-panel');
const adminRoutes = require('./routes/Application')

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(registRoutes);
app.use(editRoutes);
app.use(searchRoutes);
app.use(adminRoutes);

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/StudentsInDormitory')
        app.listen(PORT, () => {
            console.log(`Sever is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()