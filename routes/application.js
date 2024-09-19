const express = require('express')
const User = require('../models/user');
const Dormitory=require('../models/dormitory')
const Application=require('../models/application')

const router = express.Router();

router.get('/applications', async (req, res) => {
    if (req.userData && req.userData.role != 'admin') {
        return res.status(403).send('Доступ запрещен');
    }
    try {
        const applications = await Application.find()
            .populate('user', 'firstName lastName age settlementStatus')
            .populate('dormitory', 'name');
        res.json(applications);
    } catch (err) {
        res.status(500).send('Ошибка при получении заявок.');
    }
});


router.post('/create-application', async (req, res) => {
    const { userId } = req.body;
    try {
    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Пользователь не найден.');
        }
        const newApplication = new Application({
            user: user._id,
            dormitory: null, 
            applicationDate: new Date() 
        });

        await newApplication.save();
        user.settlementStatus = 'Заявка принята';
        await user.save();

        res.send('Заявка успешно создана!');
    } catch (err) {
        res.status(500).send('Ошибка при создании заявки.');
    }
});

router.post('/settle-student', async (req, res) => {
    const { applicationId, dormitoryId } = req.body;
    if (req.userData && req.userData.role !== 'admin') {
        return res.status(403).send('Доступ запрещен');
    }
    try {
    
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).send('Заявка не найдена.');
        }

        const dormitory = await Dormitory.findById(dormitoryId);
        if (!dormitory) {
            return res.status(404).send('Общежитие не найдено.');
        }

        const user = await User.findById(application.user);
        if (!user) {
            return res.status(404).send('Пользователь не найден.');
        }

        application.dormitory = dormitory._id;
        await application.save();

       
        user.settlementStatus = 'Заселён';
        await user.save();

        res.send('Студент успешно заселён!');
    } catch (err) {
        res.status(500).send('Ошибка при заселении студента.');
    }
});

router.post('/reject-dormitory', async (req, res) => {
    const { userId } = req.body;
    if (req.userData && req.userData.role !== 'admin') {
        return res.status(403).send('Доступ запрещен.');
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Пользователь не найден.');
        }

        const application = await Application.findOne({ user: user._id });
        if (!application) {
            return res.status(404).send('Заявка не найдена.');
        }

        user.settlementStatus = 'Заявка принята';
        await user.save();

        application.dormitory = null;
        await application.save();

        res.send('Студент выселен из общежития.');
    } catch (err) {
        console.error('Ошибка при отклонении заявки:', err);
        res.status(500).send('Ошибка сервера. Попробуйте снова позже.');
    }
});



module.exports = router;