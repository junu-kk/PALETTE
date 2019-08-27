//Model for application(for extracurricular activities)
var mongoose = require('mongoose');

//schema for E-Certification of user
var ecertSchema = mongoose.Schema({
  pfolio:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Pfolio',
  },
  //추후추가예정
},{collection:"ecert"});

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