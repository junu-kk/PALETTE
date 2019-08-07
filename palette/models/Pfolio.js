var mongoose = require('mongoose');

var pfolioSchema = mongoose.Schema({
  pos:[{
    type:String,
  }],
  awards:[{
    type:String,
  }],
  projs:[{
    type:String,
  }],
  interns:[{
    type:String,
  }],
  ecert:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Ecert',
  },
});

pfolioSchema.methods={
  savePfolio:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports = mongoose.model('Pfolio', pfolioSchema);