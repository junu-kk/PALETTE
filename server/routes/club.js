//router for club
var express = require('express');
var router = express.Router();
var Club = require('../models/Club');

var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var mongoURI = 'mongodb+srv://KangJunewoo:brian980115@cluster0-mh67x.mongodb.net/palette_test?retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

//show list of clubs
router.get('/', (req, res, next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Club.find({}).exec((err,clubs)=>{
    if(err) throw err;

    return res.render('club', {ct:{
      clubs:clubs,
    }});
  });
});

//show information of a club
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Club.findOne({_id:req.params.id})
  .populate('school')
  .exec((err,club)=>{
    if(err) throw err;
    return res.render('club/show', {ct:{
      club:club,
    }});
  });
});

router.get('/hi/:id', (req,res,next)=>{

  Club.findOne({_id:req.params.id}).populate('pic').exec((err,club)=>{
    if(err) throw err;

    if(club.pic==null||club.pic==''){
      return;
    }
    gfs.files.findOne({_id:club.pic._id},(err,file)=>{
      if(err) throw err;

      const readstream=gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });
});

module.exports = router;
