const express = require('express');
const router = express.Router();

const passport = require('passport');
const sendActivationLink = require('../helpers/mailer').sendActivationLink;
const passportFacebook = require('../helpers/facebook');

const User = require('../models/User');
const Photo = require('../models/Photo');
const Event = require('../models/Event');
const Music = require('../models/Music');


// //multer config
// const multer = require('multer');
// const upload = multer({dest: './public/assets'});


const errDict = {
  UserExistsError: 'Este usuario ya existe'
}

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return res.redirect('/');
  return next();
}

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  return res.redirect('/login');
}

// router.get('/layout', (req, res)=>{ 
//   console.log(req.user)
//   res.render('layout', req.user) 
//})

//checkRole('role)
function checkActive(user){ 
  return (req, res, next) => {
    if(!req.isAuthenticated()) return res.redirect('/login');
    if(user.active) return next();
    return res.redirect('/');
  }  
}
function checkRole(role){ 
  return (req, res, next) => {
    if(!req.isAuthenticated()) return res.redirect('/login');
    if(role === req.user.role) return next();
    return res.send('no tienes permiso');
  }  
}



//logout
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
   res.redirect('/login');
})


//SignUp
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});
router.post('/signup', (req, res, next) => {
  if(req.body.password !== req.body.repeatpassword) {
    req.body.err = 'Tu password no coincide';
    res.render('auth/signup', req.body);
  }

  User.register(req.body, req.body.password)
  .then(user=>{
    sendActivationLink(user);
    res.redirect('/login');
  })
  .catch(e=>{
    req.body.err = errDict[e.name];
    res.render('auth/signup', req.body);
  });
});

//activaciónLink
router.get('/activation', isLoggedIn, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {active: true}, {new: true})
  .then(user=>{
    res.send('Activado, gracias ' +  req.user.username);
    console.log("ACTIVADO GRACIAS " + req.user.username)
  })
  .catch(e=>next(e))
})

//loginFacebook
router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

router.get('/login', isAuth, (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/');
});

//Logout
router.post('/logout',  (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

/* GET Photo Gallery */
router.get('/gallery', (req, res, next) => {
  const manager = req.user.role === 'MANAGER'
  Photo.find({}, (err, photos) => {
    if(err) return console.log(err); 
    if (manager) {
     // req.app.locals.manager = manager;
      return res.render('gallery', {photos, manager});
    }
    res.render('gallery', {photos})
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
  const manager = req.user.role === 'MANAGER'
  Music.find({}, (err, musics) => {
    if(err) return console.log(err); 
    if (manager) {
      return res.render('music', {musics, manager});
     }
     return res.render('music', {musics});
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

/* GET Events */
router.get('/events', (req, res, next) => {
  const manager = req.user.role === 'MANAGER'
  Event.find({}, (err, events)=>{
    if(err) return console.log(err); 
    if (manager) {
      return res.render('events', {events, manager});
    }
    return res.render('events', {events});
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