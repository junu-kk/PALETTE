var mongoose = require('mongoose');

var portfolioSchema=mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
},{collection:'portfolio'});

portfolioSchema.methods={
  savePortfolio: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports=mongoose.model('Portfolio', portfolioSchema);