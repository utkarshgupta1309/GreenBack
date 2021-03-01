'use strict';
var mongoose = require('mongoose');

var userMeetingsSchema = mongoose.Schema({
  authId:mongoose.Schema.Types.ObjectId,
  commands:String,
  uuid:String,
  meeting_id:String,
  topic:String,
  host_id:String,
  start_time:String,
  recording_start_time:String,
  timezone:String,
  type:Number,
  duration:String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

userMeetingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  return next();
});

module.exports = mongoose.model('user-meetings', userMeetingsSchema,'user-meetings');
