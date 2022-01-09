require('dotenv').config();
const express = require('express');

const { PORT } = process.env;

const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//     let body = '';

//     const converter = {
//         'application/json': JSON.parse,
//         'application/x-www-form-urlencoded': (body) => {
//             return Object.fromEntries(body.split('&').map((x) => x.split('=')));
//         },
//     }[req.headers['content-type']];

//     req.on('data', (data) => {
//         body += data.toString();
//     });

//     req.on('end', () => {
//         req.body = converter ? converter(body) : body;
//         next();
//     });
// });

app.post('/post', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
