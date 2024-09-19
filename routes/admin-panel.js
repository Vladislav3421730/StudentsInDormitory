const express = require('express')
const User = require('../models/user');
const Application = require('../models/application')

const router = express.Router();

router.post('/delete-user', async (req, res) => {
  const { userId } = req.body;
  if (req.userData && req.userData.role !== 'admin') {
    return res.status(403).send('Доступ запрещен.');
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('Пользователь не найден.');
    }
    if (user.role == 'admin') {
      return res.status(403).send('Данный пользователь является админом, вы не можете его удалить');
    }

    await User.findByIdAndDelete(userId);
    await Application.findOneAndDelete({user : user})
    res.send('Пользователь успешно удален.');
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).send('Ошибка сервера. Попробуйте снова позже.');
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).send('Ошибка сервера. Попробуйте снова позже.');
  }
});

router.post('/make-admin', async (req, res) => {
  const { userId } = req.body;
  if (req.userData && req.userData.role !== 'admin') {
    return res.status(403).send('Доступ запрещен.');
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('Пользователь не найден.');
    }

    if (user.role === 'admin') {
      return res.status(400).send('Пользователь уже является администратором.');
    }

    user.role = 'admin';
    await user.save();
    res.send('Роль пользователя успешно изменена на администратора.');
  } catch (error) {
    console.error('Ошибка при изменении роли пользователя:', error);
    res.status(500).send('Ошибка сервера. Попробуйте снова позже.');
  }
});


module.exports = router