var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  isStudent:{
    type:Boolean,
  },
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  introduce:{
    type:String,
  },
  fun_facts:{
    type:String,
  },
  palette:[{
    type:String,
    enum:["Arts","Academic","Media","Community","STEM","Sports"]
  }],
  dob:{
    type:Date,
  },
  s_i:{
    type:String,
  },
  photo:{
    type:String
  },
  school:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'School',
  },
  club:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Club',
  },
  subscribedCompetitions:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Competition',
  },
  subscribedEvents:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Event'
  }
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