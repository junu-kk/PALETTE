//Model for portfolio of user
var mongoose = require('mongoose');

var pfolioSchema = mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
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
},{collection:"pfolio"});

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