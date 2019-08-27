//Model for Uploaded pictures
var mongoose = require('mongoose');

var uploadSchema = mongoose.Schema({
  length:{
    type:Number,
  },
  chunkSize:{
    type:Number,
  },
  uploadDate:{
    type:Date,
  },
  filename:{
    type:String,
  },
  md5:{
    type:String,
  },
  contentType:{
    type:String,
  },
},{collection:"uploads.files"});

module.exports = mongoose.model('Upload', uploadSchema);