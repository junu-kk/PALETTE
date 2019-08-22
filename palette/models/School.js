var mongoose = require('mongoose');

var schoolSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  //역시 나중에 넣을 예정
  pic:{
    type:String,
  },
  info:{
    type:String,
  },
  major:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Major',
  }],
  clubs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Club',
  }],
}, {collection:'school'});

schoolSchema.methods={
  saveSchool:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.saveSchool(callback);
    });
  }
}

module.exports=mongoose.model('School', schoolSchema);