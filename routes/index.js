const express = require('express');
const router  = express.Router();
const Photo = require('../models/Photo');
const User = require('../models/User');
const Event = require('../models/Event');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

<<<<<<< HEAD
=======
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

/* GET Music */
router.get('/music', (req, res, next) => {
  res.render('music');
})
>>>>>>> 0510c844549ea61e92b2975513ed88a9bce56553

module.exports = router;
