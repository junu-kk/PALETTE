//Model for Extracurricular Activities
var mongoose = require('mongoose');

var excSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  info:{
    type:String,
    required:true,
  },
  //pic upload
  pic:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Upload',
  },
  //schedule : 일단 하나만 구현.
  sch:{
    date:{
      type:Date,
    },
    event:{
      type:String,
    }
  },
  contact:{
    type:String,
  },
  due:{
    type:Date,
  },
  //application questions
  apcnqs:[{
    type:String,
  }],
  //applications
  apcns:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Apcn',
  }],
}, {collection:"exc"}
);

excSchema.methods = {
  saveExc: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },
}

module.exports = mongoose.model('Exc', excSchema);