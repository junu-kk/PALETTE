var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  fname:{
    type : String,
    required : true,
  },
  lname:{
    type : String,
    required : true,
  },
  email:{
    type : String,
    required : true,
    unique : true,
  },
  pw:{
    type : String,
    required : true,
    trim : true,
  },
  dob:{
    type : Date,

  },
  address:{
    type : String,
  },
  school:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School',
  },
  clubs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Club',
  }],
  pic:{
    type:String,
  },
  bio:{
    type:String,
    'default':'',
  },
  ecert:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Ecert',
  },
  pfolio:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Pfolio',
  },
  grade:{
    type:Number,
    required:true,
  },
  class:{
    type:String,
  },
  major:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Major',
  },
  work_exp:{
    type:String,
  },
  fun_facts:{
    type:String,
  },
  s_i:{
    type:String,
  }
});

userSchema.methods = {
  saveUser: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },

  pwCheck: function(pw){
    if(pw===this.pw){
      return true;
    } else{
      return false;
    }
  },
}

module.exports = mongoose.model('User', userSchema);