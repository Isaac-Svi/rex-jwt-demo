require('dotenv').config();
const express = require('express');
const user = require('./models/user.model');
const { TokenProcessor } = require('rex-jwt-middleware');

// config
const { PORT, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

// database connection
require('./config/db')();

const app = express();

// middleware
app.use(express.json());
app.use(
    new TokenProcessor({
        refreshToken: {
            secret: REFRESH_TOKEN_SECRET,
            exp: 20 * 60, // Number of seconds from epoch
            route: '/refresh',
            cookieName: 'rex',
        },
        accessToken: {
            secret: ACCESS_TOKEN_SECRET,
            exp: 20,
        },
    })
);

app.post('/register', user.register);
app.post('/login', user.fields(['email', 'username']), user.login);
app.post('/logout', user.logout);
app.post('/refresh', user.fields(['email', 'username']), user.refresh);

app.get('/secret', user.protect, (req, res) => {
    res.send('secret');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
