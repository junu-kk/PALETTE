//Model for application(for extracurricular activities)
var mongoose = require('mongoose');

var apcnSchema = mongoose.Schema({
  exc:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Exc',
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  ans:[{
    type:String,
  }],
}, {collection:"apcn"}
);

apcnSchema.methods = {
  saveApcn: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports = mongoose.model('Apcn', apcnSchema);