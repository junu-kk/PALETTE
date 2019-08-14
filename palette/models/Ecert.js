var mongoose = require('mongoose');

var ecertSchema = mongoose.Schema({
  pfolioid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Pfolio',
  },
},{collection:"ecerts"});

ecertSchema.methods={
  saveEcert:function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.saveEcert(callback);
    });
  }
}

module.exports=mongoose.model('Ecert', ecertSchema);