app.use((req, res, next) => {
    let body = '';

    const converter = {
        'application/json': JSON.parse,
        'application/x-www-form-urlencoded': (body) => {
            return Object.fromEntries(body.split('&').map((x) => x.split('=')));
        },
    }[req.headers['content-type']];

    req.on('data', (data) => {
        body += data.toString();
    });

    req.on('end', () => {
        req.body = converter ? converter(body) : body;
        next();
    });
});
