//Import node modules
const express = require('express');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

//To accept json format
app.use(express.json({extended: true}));

//Register our routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

async function start() {
    try {
        //If all is okey, connect to mongodb
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernUrlShortener', {});
        app.listen(PORT, () => console.log('App started on port', PORT));
    } catch (e) {
        //Exit process if something went wrong
        console.log('Server error', e.message);
        process.exit(1)
    }
}

start();
