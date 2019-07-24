const config = require('config');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const users = require('./routes/users');
const auth = require('./routes/auth');
const artists = require('./routes/artists');

// require express
const express = require('express');
// create application
const app = express();


// check for jwt key
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// connect to mongodb
mongoose.connect('mongodb://localhost/play-archive', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB'));

// middleware
app.use(logger('dev'));
app.use(express.json()); // parse json // with express built-in middleware
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from ./public

// routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/artists', artists);

// web server listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
