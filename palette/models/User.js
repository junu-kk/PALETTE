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
  password:{
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
  },
  /*
  ecert는 pfolio에 포함시키자.
  ecert:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Ecert',
  },
  */
  pfolio:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Pfolio',
  },
  grade:{
    type:Number,
    //required:true,
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
  },
  is_new:{
    type:Boolean,
    default:true,
  },
  excs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Exc',
  }],
},{collection:"users"});

userSchema.methods = {
  saveUser: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },

  passwordCheck: function(password){
    if(password===this.password){
      console.log('비번같아');
      return true;
    } else{
      console.log('비번달라');
      return false;
    }
  },
}

module.exports = mongoose.model('User', userSchema);