'use strict';
var mongoose = require('mongoose');

var zoomClientsSchema = mongoose.Schema({
  id:String,
  firstName:String,
  lastName:String,
  email:String,
  pmi:String,
  timezone:String,
  profilePic:String,
  accessToken:String,
  refreshToken:String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

zoomClientsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  return next();
});

module.exports = mongoose.model('zoom-clients', zoomClientsSchema,'zoom-clients');
