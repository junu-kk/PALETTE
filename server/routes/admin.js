//어드민체크 통일할 방법이 없을까?

var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Exc = require('../models/Exc');
var School = require('../models/School');
var Club = require('../models/Club');

var multer = require('multer');
var upload = multer({dest:'./upload'});


router.get('/', (req,res)=>{
  if(req.isUnauthenticated()){
    res.status(404).json({status:"not logged in"});
  } else{
    User.findOne({email:req.user.email}).exec((err,user)=>{
      if(err) throw err;
      if(user.admin==false){
        res.status(404).json({status:"not logged in"});
      } else{
        res.status(200).json({status:"you are administrator!"});
      }
    });
  }
});


router.post('/exc/create', upload.single('file'), (req,res,next)=>{
  let image='/image/'+req.file.filename;
  var newExc = new Exc();
  newExc.pic = image;
  
  newExc.name = req.body.name;
  newExc.info = req.body.info;
  newExc.sch.event = req.body.sche;
  newExc.sch.date = req.body.schd;
  newExc.contact = req.body.contact;
  newExc.due = req.body.due;
  newExc.price = req.body.price;
  newExc.palette = req.body.palette;
  newExc.gu = req.body.gu;
  newExc.location = req.body.location;

  if(req.body.apcnq0!=null){
    newExc.apcnqs.push(req.body.apcnq0);
  }
  if(req.body.apcnq1!=null){
    newExc.apcnqs.push(req.body.apcnq1);
  }
  if(req.body.apcnq2!=null){
    newExc.apcnqs.push(req.body.apcnq2);
  }
  if(req.body.apcnq3!=null){
    newExc.apcnqs.push(req.body.apcnq3);
  }
  if(req.body.apcnq4!=null){
    newExc.apcnqs.push(req.body.apcnq4);
  }

  
  newExc.saveExc((err)=>{
    if(err) throw err;
  });

});


router.get('/exc/delete/:id', (req,res)=>{
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    res.send(user.admin);
  });
  Exc.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
});


router.post('/school/create', upload.single('file'), (req,res,next)=>{
  let image='/image/'+req.file.filename;
  var newSchool = new School();

  newSchool.pic = image;
  newSchool.name = req.body.name;
  newSchool.address = req.body.address;
  newSchool.info = req.body.info;
  console.log(newSchool);
  newSchool.saveSchool((err)=>{
    if(err) throw err;
  });
  School.find({}).exec((err,schools)=>{
    if(err) throw err;
    console.log(schools);
  });
  //return res.redirect('/admin/school');

});


router.get('/school/delete/:id', (req,res)=>{
  School.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
  
});


router.post('/club/create', upload.single('file'), (req,res,next)=>{
  let image='/image/'+req.file.filename;
  var newClub = new Club();
  newClub.pic = image;

  newClub.name = req.body.name;
  newClub.info = req.body.info;
  newClub.school = req.body.school;
  
  console.log(req.body.school);
  console.log(newClub.school);
  
  newClub.saveClub((err)=>{
    if(err) throw err;
  });
  
  School.findOne({_id:newClub.school}).exec((err,school)=>{
    if(err) throw err;
    school.clubs.push(newClub._id);
    school.saveSchool((err)=>{
      if(err) throw err;
    });
  });
  

});


router.get('/club/delete/:id', (req,res)=>{
  
  Club.findOne({_id:req.params.id}).exec((err,club)=>{
    if(err) throw err;

    School.findOne({_id:club.school}).exec((err,school)=>{
      if(err) throw err;

      console.log(school.clubs);
      console.log(club._id);
      school.clubs.splice(school.clubs.indexOf(club._id),1);
      console.log(school.clubs);
      school.saveSchool();
    });
    club.remove();
    
  });
  
  
});

module.exports = router;