const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    default: 'https://www.cutoff.es/422-large_default/vinilo-color-rojo.jpg'
  },
  role: {
    type: String,
    enum: ['FAN', 'MANAGER'],
    default: 'FAN'
  },
  active: {
    type: Boolean,
    default: false
  }
}, {
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})
module.exports = mongoose.model('User', userSchema);