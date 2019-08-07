var mongoose = require('mongoose');

var clubSchema = mongoose.Schema({

});

clubSchema.methods={
  saveClub:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.saveClub(callback);
    });
  }
}

module.exports.mongoose.model('Club', clubSchema);