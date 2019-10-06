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
  location:{
    type:String,
  },
  gu:{
    type:String,
    enum:['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구'],
  },
  //pic upload
  pic:{
    type:String,
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
  price:{
    type:Number,
  },
  palette:{
    type:String,
    enum:["Arts","Academic","Media","Community","STEM","Sports"],
  },
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