require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('¡El backend está vivo y corriendo en Vercel!');
});

app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));

module.exports = app;