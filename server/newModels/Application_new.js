var mongoose = require('mongoose'),
Schema=mongoose.Schema;

var applicationSchema=mongoose.Schema({
  form:{
    type:String,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  competition:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Competition',
  },
  event:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Event',
  },
  club:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Club',
  }
}, {collection:'application'});

applicationSchema.methods={
  saveApplication: function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}