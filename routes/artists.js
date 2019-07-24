const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAdmin = require('../middleware/ensureAdmin');
const {Artist, validate} = require('../models/artist');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// get all artists
router.get('/', async (req, res) => {
  const artists = await Artist.find().sort('name');
  res.send(artists);
});

// post an artist
router.post('/', ensureAuthenticated, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let artist = new Artist({ name: req.body.name });
  artist = await artist.save();

  res.send(artist);
});

// update an artist
router.put('/:id', ensureAuthenticated, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const artist = await Artist.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!artist) return res.status(404).send('The artist with the given ID was not found.');

  res.send(artist);
});

// delete an artist
router.delete('/:id', [ensureAuthenticated, ensureAdmin], async (req, res) => {
  const artist = await Artist.findByIdAndRemove(req.params.id);

  if (!artist) return res.status(404).send('The artist with the given ID was not found.');

  res.send(artist);
});

// get a specific artist by id
router.get('/:id', async (req, res) => {
  const artist = await Artist.findById(req.params.id);

  if (!artist) return res.status(404).send('The artist with the given ID was not found.');

  res.send(artist);
});

module.exports = router;
