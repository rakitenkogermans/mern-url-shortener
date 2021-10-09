//Import node modules
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

//Register our routes
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        //If all is okey, connect to mongodb
        await mongoose.connect(config.get('mongoUri'), {});
        app.listen(PORT, () => console.log('App started on port', PORT));
    } catch (e) {
        //Exit process if something went wrong
        console.log('Server error', e.message);
        process.exit(1)
    }
}

start();