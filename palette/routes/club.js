var express = require('express');
var router = express.Router();
var Club = require('../models/Club');

router.get('/', function(req, res, next) {
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

module.exports = router;
