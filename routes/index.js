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
router.get('/events/events-details/:id', (req, res, next) => {
  Event.findById(req.params.id,(e,ev)=>{
      console.log("ENTRAMOS AL THEN " + ev)
      res.render('events-details',ev);
  
  })
  
  
});
  router.post('/events/events-details/', (req, res, next) => {
    Event.find({}, (err, detalles)=>{
        res.redirect('/events-details/', detalles)
    })
});






module.exports = router;
