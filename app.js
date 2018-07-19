require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');


mongoose.Promise = Promise;
mongoose

mongoose.connect('mongodb://localhost:27017/project2', (err)=>{
    if(err) return console.log(err);
    return console.log("Conectado a la DB");
});

  // Para conectar con CLoudinary
  
  // .connect(process.env.DB, {useMongoClient: true})
  // .then(() => {
  //   console.log('Connected to Mongo!')
  // }).catch(err => {
  //   console.error('Error connecting to mongo', err)
  // });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'isa rojas';


//session
app.use(session({
  secret: "project2",
  resave: true,
  saveUninitialized: true
}));

//passport
const passport = require('./helpers/passport');
app.use(passport.initialize());
app.use(passport.session());

const index = require('./routes/index');
const auth = require('./routes/auth');
app.use('/', auth);
app.use('/', index);


module.exports = app;
