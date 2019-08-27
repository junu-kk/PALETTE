//router for club
var express = require('express');
var router = express.Router();
var Club = require('../models/Club');

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

module.exports = router;
