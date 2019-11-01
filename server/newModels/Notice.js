var mongoose = require('mongoose');

var noticeSchema = mongoose.Schema({
  priority:{
    type:Number,
  },
  title:{
    type:String,
  },
  text:{
    type:String,
  },
  photos:[{
    type:String,
  }],
  //writer랑 뭐가 다른거지?
  author:{
    type:String,
  },
  created:{
    type:Date,
  },
  writer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  }

},{collection:'notice'});

noticeSchema.methods={
  saveNotice: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports=mongoose.model('Notice', noticeSchema);