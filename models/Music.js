const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


module.exports = mongoose.model('Music', musicSchema);