require('dotenv').config({ path: './sample.env' });
const express = require('express');
const cookieParser = require('cookie-parser');

const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const auth = require('./auth.js');

const app = express();
app.use(cookieParser());
app.use('/auth', auth.routes);
installHandler(app);

// const port = process.env.API_SERVER_PORT || 3000;
const port = process.env.PORT || 3000;

(async function start() {
    try {
        await connectToDb();
        app.listen(port, () => {
            console.log(`API server started on port ${port}`);
        });
    } catch (e) {
        console.log('ERROR:', e);
    }
}());
