var mongoose = require('mongoose');

var schoolSchema = mongoose.Schema({

});

schoolSchema.methods={
  saveSchool:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.saveSchool(callback);
    });
  }
}

module.exports.mongoose.model('School', schoolSchema);