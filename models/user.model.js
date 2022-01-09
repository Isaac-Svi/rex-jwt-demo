const { RexUser } = require('rex-jwt-middleware');

const user = RexUser({
    email: {
        type: String,
        min: 6,
        required: true,
    },
    password: {
        type: String,
        min: 50,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

module.exports = user;
