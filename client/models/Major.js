//Model for Major in school
//일단 major 신경쓰지 말자. 중요한건 school과 club.

var mongoose = require('mongoose');

var majorSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  school:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School',
  },
  pic:{
    type:String,
  },
  info:{
    type:String,
  },
}, {collection:"major"});

majorSchema.methods={
  saveMajor:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports=mongoose.model('Major', majorSchema);