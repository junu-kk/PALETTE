//router of school
var express = require('express');
var router = express.Router();
var School = require('../models/School');
var Major = require('../models/Major');

var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/palette_test';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

//shows list of schools
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  School.find({}).exec((err,schools)=>{
    if(err) throw err;

    return res.render('school', {ct:{
      schools:schools,
    }});
  });
});

//shows information of school
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  School.findOne({_id:req.params.id})
  .populate('clubs')
  .exec((err,school)=>{
    if(err) throw err;
    return res.render('school/show', {ct:{
      school:school,
    }});
  });
});

router.get('/hi/:id', (req,res,next)=>{

  School.findOne({_id:req.params.id}).populate('pic').exec((err,school)=>{
    if(err) throw err;

    if(school.pic==null||school.pic==''){
      return;
    }
    gfs.files.findOne({_id:school.pic._id},(err,file)=>{
      if(err) throw err;

      const readstream=gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });
});

//not using
router.get('/major/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Major.findOne({_id:req.params.id})
  .populate('school')
  .exec((err,major)=>{
    if(err) throw err;
    return res.render('school/major', {ct:{
      major:major
    }});
  });
});

module.exports = router;
