var mongoose = require('mongoose');

var majorSchema = mongoose.Schema({

});

majorSchema.methods={
  saveMajor:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.saveMajor(callback);
    });
  }
}

module.exports.mongoose.model('Major', majorSchema);