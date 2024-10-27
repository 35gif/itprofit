const express = require('express');
const cors = require('cors');
const app = express();
const port = 9090;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ status: 'success', message: 'Server is rady' });
});

app.post('/api/registration', (req, res) => {
  console.log('Received data:', req.body);
  
  const isSuccess = Math.random() < 0.5;

  if (isSuccess) {
    res.json({
      status: 'success',
      message: 'Ваша заявка успешно отправлена'
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Произошла ошибка при отправке заявки',
      errors: {
        name: 'Имя должно содержать только буквы',
        email: 'Неверный формат email',
        phone: 'Неверный формат телефона',
        message: 'Сообщение слишком короткое'
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
