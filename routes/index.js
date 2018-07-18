const express = require('express');
const router  = express.Router();
const Photo = require('../models/Photo');
const User = require('../models/User');
const Event = require('../models/Event');

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



/* GET Music */
router.get('/music', (req, res, next) => {
  res.render('music');
})



/* GET Photo Gallery */
router.get('/gallery', (req, res, next) => {
  Photo.find({}, (err, photos) => {
    if(err) { 
    } else {
      res.render('gallery', {photos});
    }
  });
})



/* GET Events */
router.get('/events', (req, res, next) => {
  Event.find({}, (err, eventos)=>{
    res.render('events', eventos);
   // console.log(" qui van eventos",eventos);
  })
})

/* GET New event form */
router.get('/events/new-events', (req, res, next) => {
  res.render('new-events');
});

/* POST Create new event*/
router.post('/events/new-events', (req, res, next) => {
  Event.create(req.body)
  .then(
    res.redirect('/events')
  )
  .catch(e=>next(e))
});


/* GET Events-details*/
router.get('/events/events-details/:_id', (req, res, next) => {
  Event.findOne(req.params.id,(e,ev)=>{
    console.log(ev)
    res.render('events-details/:id',ev);
  })
  
});
  router.post('/events/events-details/', (req, res, next) => {
    Event.find({}, (err, detalles)=>{
    
        res.redirect('/events-details/', detalles)
    })
});






module.exports = router;
