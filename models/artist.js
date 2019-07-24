const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

const Artist = mongoose.model('Artist', artistSchema);

function validateArtist(artist) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(artist, schema);
}

exports.artistSchema = artistSchema;
exports.Artist = Artist;
exports.validate = validateArtist;
