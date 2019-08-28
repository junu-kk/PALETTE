//router for extracurricular activities
var express = require('express');
var router = express.Router();
var Exc = require('../models/Exc');
var Apcn = require('../models/Apcn');
var User = require('../models/User');


var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/palette_test';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


//show list of extracurricular activities
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.find({}).exec((err,excs)=>{
    if(err) throw err;

    return res.render('exc', {ct:{
      excs:excs
    }});
  });
});
//show information of an extracurricular activity
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  console.log('works');
  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
    if(err) throw err;
    console.log(exc);
    return res.render('exc/show',{ct:{
      exc:exc
    }});
  });
});

router.get('/hi/:id', (req,res,next)=>{

  Exc.findOne({_id:req.params.id}).populate('pic').exec((err,exc)=>{
    if(err) throw err;

    if(exc.pic==null||exc.pic==''){
      return;
    }
    gfs.files.findOne({_id:exc.pic._id},(err,file)=>{
      if(err) throw err;

      const readstream=gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });
});

//shows application form for
//registering the extracurricular activity
router.get('/apcn/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
    if(err) throw err;
    return res.render('exc/apcn',{ct:{
      exc:exc
    }});
  });
});

//procedure for registering extracurricular activity
router.post('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
    if(err) throw err;

    if(exc.due<Date.now()){
      console.log('over due');
      return res.redirect('/main');
    }

    var newApcn = new Apcn();
    console.log(req.body.ans);

    for(i=0;i<req.body.ans.length;i++){
      newApcn.ans.push(req.body.ans[i]);
    }
    console.log(newApcn.ans);
    
    User.findOne({email:req.user.email}).exec((err,user)=>{
      if(err) throw err;

      newApcn.user=user._id;
      newApcn.exc=exc._id;
      exc.apcns.push(newApcn._id);
      user.excs.push(exc._id);
      
      
      
      
      user.saveUser((err)=>{
        if(err) throw err;
      });
      exc.saveExc((err)=>{
        if(err) throw err;
      });
      newApcn.saveApcn((err)=>{
        if(err) throw err;
      });
      
    });
    
  });
  return res.redirect('/main');
});

module.exports = router;
