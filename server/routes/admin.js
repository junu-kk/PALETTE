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

var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
require('../models/Upload');
var Grid = require('gridfs-stream');

var mongoose = require('mongoose');
var mongoURI = 'mongodb+srv://KangJunewoo:brian980115@cluster0-mh67x.mongodb.net/palette_test?retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url:'mongodb+srv://KangJunewoo:brian980115@cluster0-mh67x.mongodb.net/palette_test?retryWrites=true&w=majority',
  file:(req,file)=>{
    return new Promise((resolve, reject)=>{
      crypto.randomBytes(16, (err,buf)=>{
        if(err) return reject(err);
        const filename = buf.toString('hex')+path.extname(file.originalname);
        const fileInfo = {
          filename:filename,
          bucketName:'uploads',
        };
        resolve(fileInfo);
      });
    });
  }
});
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
const upload = multer({storage});

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
  var newExc = new Exc();
  //console.log(res.req); 여기서 file이 없음.
  //왜 이게 안되는가.
  //다른거는 mypage는 file만 보내는거고 여기는 다 보내는건데.
  //mypage처럼 하나만 딱 해보자.
  newExc.pic = res.req.file.id;
  
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
  var newSchool = new School();
  newSchool.pic = res.req.file.id;
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
  var newClub = new Club();
  newClub.pic = res.req.file.id;

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
  //Club.findOneAndDelete({_id:req.params.id},(err)=>{if(err) throw err;});
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