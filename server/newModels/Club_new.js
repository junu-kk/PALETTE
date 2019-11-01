var mongoose = require('mongoose');

var clubSchema=mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  photos:[{
    type:String,
  }],
  description:{
    type:String,
  },
  logo:{
    type:String,
  },
  school:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School',
  }

},{collection:'club'});

clubSchema.methods={
  saveClub:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports = mongoose.model('Club', clubSchema);