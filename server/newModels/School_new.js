var mongoose = require('mongoose');

var schoolSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  introduce:{
    type:String,
  },
  photos:[{
    type:String,
  }],
  clubs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Club',
  }]
}, {collection:'school'});

schoolSchema.methods={
  saveSchool:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports = mongoose.model('School', schoolSchema);