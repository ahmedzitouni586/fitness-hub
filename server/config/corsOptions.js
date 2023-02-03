const whitelist = [
    'https://www.yoursite.com',
    'http://197.0.15.184:5500',
    'http://localhost:3500',
    'http://localhost:3000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }

    },
    optionsSuccessStatus: 200, credentials: true
}

module.exports = corsOptions;