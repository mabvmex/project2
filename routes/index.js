const express = require('express');
const router  = express.Router();
const Photo = require('../models/Photo');
const User = require('../models/User');
const Event = require('../models/Event');
const Music = require('../models/Music');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET Photo Gallery */
router.get('/gallery', (req, res, next) => {
  Photo.find({}, (err, photos) => {
    if(err) {
      console.log(err); 
    } else {
      res.render('gallery', {photos});
    }
  });
})

/* GET New Photo form */
router.get('/gallery/new-photo', (req, res, next) => {
  res.render('new-photo');
})

/* GET Create new Photo*/
router.post('/gallery/new-photo', (req, res, next) => {
  Photo.create(req.body)
  .then(
    res.redirect('/gallery')
  )
  .catch(e=>next(e))
});

/*  DELETE Photo */
router.delete('/gallery/delete/:id', (req, res, next) => {
  console.log(req.params.id);
  Photo.findByIdAndRemove(req.params.id)
  .then(item=>{
    console.log("borrado papi", item)
    res.status(200).json(item);
  })
  .catch(e=>next(e))
});

/* GET Music */
router.get('/music', (req, res, next) => {
  Music.find({}, (err, musics) => {
    if(err) {
      console.log(err); 
    } else {
      res.render('music', {musics});
    }
  });
})

/* GET New Music form */
router.get('/music/new-music', (req, res, next) => {
  res.render('new-music');
})

/* GET Create new music */
router.post('/music/new-music', (req, res, next) => {
  Music.create(req.body)
  .then(
    res.redirect('/music')
  )
  .catch(e=>next(e))
})

module.exports = router;
