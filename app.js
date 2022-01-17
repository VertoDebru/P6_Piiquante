require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

    next();
});

app.use(bodyParser.json());
app.post('/api/auth/login', userRoutes);
app.post('/api/auth/signup', userRoutes);
app.get('/api/sauces', saucesRoutes);

module.exports = app;
