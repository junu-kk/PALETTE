var mongoose = require('mongoose');

var eventSchema=mongoose.Schema({
  name:{
    type:String,
  },
  photo:[{
    type:String,
  }],
  description:{
    type:String,
  },
  start_date:{
    type:Date,
  },
  end_date:{
    type:Date,
  },
  location:{
    type:String
  },
  created:{
    type:Date,
    default:Date.now,
  },
  organizer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
}, {collection:'event'});

eventSchema.methods={
  saveEvent: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports = mongoose.model('Event', eventSchema);