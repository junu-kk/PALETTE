/*
로그인체크 -> 권한체크 필요!!
*/
//router for administration작업중
//모든 get함수에 admin권한 확인 나중에 추가할것(req.isUnauthenticated부분)
//왜 모듈화가 안되는지 모르겠다. 일단 코드가 길어지더라도 다 추가.
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Exc = require('../models/Exc');
var School = require('../models/School');
var Club = require('../models/Club');
var multer = require('multer');
var upload = multer({dest:'./upload'});


/*
function adminCheck(req,res){
  User.findOne({email:req.user.email}).exec((err,user)=>{
  if(err) throw err;

  if(user.admin==false){
    console.log('되는겨?');
    return false;
  } else{
    return true;
  }
  });
}
*/

router.get('/', (req,res)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });
  return res.render('admin');
});
//admin에서의 exc 목적 : exc를 create&delete하는 데에 있다.
router.get('/exc', (req,res)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });

  Exc.find({}).exec((err,excs)=>{
    if(err) throw err;

    return res.render('admin/exc',{ct:{
      excs:excs
    }});
  });
});

router.get('/exc/create', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });
  return res.render('admin/exc/create');

});

router.post('/exc/create', upload.single('file'), (req,res,next)=>{
  let image = '/image/'+req.file.filename;
  var newExc = new Exc();
  //console.log(res.req); 여기서 file이 없음.
  //왜 이게 안되는가.
  //다른거는 mypage는 file만 보내는거고 여기는 다 보내는건데.
  //mypage처럼 하나만 딱 해보자.
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
  
  newExc.saveExc((err)=>{
    if(err) throw err;
  });

  return res.redirect('/admin/exc');

});


router.get('/exc/delete/:id', (req,res)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });
  Exc.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
  return res.redirect('/admin/exc');
});

router.get('/school', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });

  School.find({}).exec((err,schools)=>{
    if(err) throw err;

    return res.render('admin/school',{ct:{
      schools:schools
    }});
  });
});

router.get('/school/create', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });
  return res.render('admin/school/create');

});

router.post('/school/create', upload.single('file'), (req,res,next)=>{
  let image = '/image/'+req.file.filename;
  
  var newSchool = new School();
  newSchool.pic = image;
  newSchool.name = req.body.name;
  newSchool.address = req.body.address;
  newSchool.info = req.body.info;
  
  newSchool.saveSchool((err)=>{
    if(err) throw err;
  });
  return res.redirect('/admin/school');

});


router.get('/school/delete/:id', (req,res)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });
  School.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
  return res.redirect('/admin/school');
});

router.get('/club', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });

  Club.find({}).exec((err,clubs)=>{
    if(err) throw err;

    return res.render('admin/club',{ct:{
      clubs:clubs
    }});
  });
});

router.get('/club/create', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });
  School.find({}).exec((err,schools)=>{
    if(err) throw err;

    return res.render('admin/club/create',{ct:{
      schools:schools
    }});
  });
});

router.post('/club/create', upload.single('file'), (req,res,next)=>{
  let image = '/image/'+req.file.filename
  var newClub = new Club();
  newClub.pic = image;

  newClub.name = req.body.name;
  newClub.info = req.body.info;
  newClub.school = req.body.school;
  
  
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
  
  return res.redirect('/admin/club');

});


router.get('/club/delete/:id', (req,res)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.admin==false){
      return res.redirect('/main');
    }
  });

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
  
  return res.redirect('/admin/club');
});

module.exports = router;