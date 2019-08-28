//router for administration작업중
//모든 get함수에 admin권한 확인 나중에 추가할것(req.isUnauthenticated부분)
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Exc = require('../models/Exc');

var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
require('../models/Upload');
var Grid = require('gridfs-stream');

var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/palette_test';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url:'mongodb://localhost:27017/palette_test',
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

const upload = multer({storage});

router.get('/', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOne({email:req.user.email})
  .exec((err,user)=>{
    if(err) throw err;
    
    
    if(user.admin==false){
      return res.redirect('/main');
    }

    return res.render('admin');
  });
});
//admin에서의 exc 목적 : exc를 create&delete하는 데에 있다.
router.get('/exc', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }

  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;

    if(user.admin==false){
      return res.redirect('/main')
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




//일단이거는보류 create랑 delete 먼저
/*
router.get('/exc/:id', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }

  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;

    if(user.admin==false){
      return res.redirect('/main')
    }
  });

  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
    if(err) throw err;
    return res.render('admin/exc/show',{ct:{
      exc:exc
    }});
  });
});
*/
//사진보여주기
router.get('/exc/:id/hi', (req,res,next)=>{

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
//isAdmin 귀찮아서 그냥 나중에 다 때려넣자.
/*
router.post('/exc/:id/upload', upload.single('file'),(req,res,next)=>{
  Exc.findOne({_id:req.params.id}).exec((err,newExc)=>{
    if(err) throw err;

    newExc.pic = res.req.file.id;
    newExc.saveExc((err)=>{
      if(err) throw err;
    });

    res.redirect('/main');
  })
})
*/

module.exports = router;