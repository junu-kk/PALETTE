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
  //이미지는 항상 nodejs를 통해 업로드해야 하므로
  //아직은 구현불가
  pic:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Upload',
  },
  sch:[{
    date:{
      type:Date,
    },
    event:{
      type:String,
    }
  }],
  contact:{
    type:String,
  },
  due:{
    type:Date,
  },
  apcnq:[{
    type:String,
  }],
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