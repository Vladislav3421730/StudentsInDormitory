const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User= require('../models/user');

const router = express.Router();


router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, age, course, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !age || !course) {
        return res.status(400).send('Все поля должны быть заполнены.');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).send('Неверный формат электронной почты.');
    }

    if (password.length < 4 || username.length < 4) {
        return res.status(400).send('Пароль и логин должны содержать минимум 4 символа.');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Пароли не совпадают.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Логин уже используется.');
    }

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            age,
            course,
            password: hashedPassword,
            role: 'user',
            settlementStatus: 'Не подавал заявку'
        });

        await newUser.save();
        console.log('Пользователь сохранен:', newUser);
        res.send('Регистрация прошла успешно!');
    } catch (err) {
        res.status(500).send('Ошибка при регистрации пользователя.');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(400).send('Логин не найден.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Неверный пароль.');
    }
    const userData = {
        id: user._id,
        firstname: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
        email: user.email,
        age: user.age,
        course: user.course,
        role: user.role,
        status: user.settlementStatus
    };
    res.json(userData);
});

router.post('/update-profile', async (req, res) => {
    const { firstName, lastName, username, email, oldUsername, course, age } = req.body;

    if (!firstName || !lastName || !username || !email || !course || !age) {
        return res.status(400).send('Все поля должны быть заполнены.');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).send('Неверный формат электронной почты.');
    }

    try {
        const user = await User.findOne({ username: oldUsername });
        if (!user) {
            return res.status(404).send('Пользователь не найден.');
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        user.course = course;
        user.age = age;

        await user.save();

        console.log('Пользователь сохранен:', user);
        res.send('Изменения сохранены!');
    } catch (err) {
        console.error('Ошибка при изменении аккаунта:', err);
        res.status(500).send('Ошибка при изменении аккаунта.');
    }
});

module.exports = router;