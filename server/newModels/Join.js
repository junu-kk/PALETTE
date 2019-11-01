var mongoose = require('mongoose');

var joinSchema = mongoose.Schema({
  auth_level:{
    type:Number,
  },
  club:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'club'
  },
  student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'student'
  }
}, {collection:'join'});

joinSchema.methods={
  saveJoin: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports=mongoose.model('Join', joinSchema);