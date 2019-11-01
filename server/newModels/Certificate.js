var mongoose = require('mongoose');

var certificateSchema = mongoose.Schema({
  type:{
    type:String,
  },
  description:{
    type:String,
  },
  issue_date:{
    type:Date,
    default:Date.now,
  },
  photo:{
    type:String,
  },
  portfolio:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'portfolio'
  },
  issuer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
}, {collection:'certificate'});

certificateSchema.methods={
  saveCertificate: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports=mongoose.model('Certificate', certificateSchema)