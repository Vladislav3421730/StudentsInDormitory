const express = require('express');
const Dormitory = require('../models/dormitory');
const User=require('../models/user')
const Application=require('../models/application')
const router = express.Router();

router.get('/dormitories', async (req, res) => {
    try {
        const dormitories = await Dormitory.find();
        res.json(dormitories);
    } catch (err) {
        res.status(500).send('Ошибка при получении списка общежитий.');
    }
});


router.post('/add-dormitory', async (req, res) => {
    const { name, address, numberOfResidents } = req.body;
    if (req.userData && req.userData.role !== 'admin') {
        return res.status(403).send('Доступ запрещен');
    }
    try {
        const newDormitory = new Dormitory({
            name,
            address,
            numberOfResidents
        });

        await newDormitory.save();
        res.send('Новое общежитие добавлено!');
    } catch (err) {
        res.status(500).send('Ошибка при добавлении общежития.');
    }
});


router.post('/delete-dormitory', async (req, res) => {
    const { id } = req.body;
    if (req.userData && req.userData.role !== 'admin') {
        return res.status(403).send('Доступ запрещен');
    }
    try {
        const dormitory = await Dormitory.findByIdAndDelete(id);
        if (!dormitory) {
            return res.status(404).json({ message: 'Общежитие не найдено' });
        }
        
        const applications = await Application.find({ dormitory: id });
        
        for (const application of applications) {
            await User.findByIdAndUpdate(application.user, { settlementStatus: 'Заявка принята' });
            application.dormitory = null;
            await application.save();
        }
        
        res.json({ message: 'Общежитие удалено и статусы обновлены' });
    } catch (err) {
        console.error('Ошибка при удалении общежития:', err);
        res.status(500).send('Ошибка при удалении общежития.');
    }
});


router.get('/find-dormitory/', async (req, res) => {
    const { id } = req.params;
    try {
        const dormitory = await Dormitory.findById(id);
        if (!dormitory) {
            res.status(404).json({ message: 'Общежитие не найдено' });
        } else {
            res.json(dormitory);
        }
    } catch (err) {
        res.status(500).send('Ошибка при поиске общежития.');
    }
});

module.exports = router;
