//Model for User
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  //first name
  fname:{
    type : String,
    required : true,
  },
  //last name
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
  //date of birth
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
    type:mongoose.Schema.Types.ObjectId,
    ref:'Upload',
  },
  bio:{
    type:String,
  },
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
  //work experiences
  work_exp:{
    type:String,
  },
  //fun facts
  fun_facts:{
    type:String,
  },
  //skills and interests
  s_i:{
    type:String,
  },
  //is user first logged-in new user?
  is_new:{
    type:Boolean,
    default:true,
  },
  //extracurricular activities
  excs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Exc',
  }],
  //is user administrator?
  admin:{
    type:Boolean,
    default:false,
  },
},{collection:"user"});

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