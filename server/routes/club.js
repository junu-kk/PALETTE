//router for club
var express = require('express');
var router = express.Router();
var Club = require('../models/Club');

//show list of clubs
router.get('/', (req, res, next)=>{
  if(req.isUnauthenticated()){
    res.status(401).json({status:"not logged in"});
  } else{
    Club.find({}).exec((err,clubs)=>{
      if(err) throw err;

      res.status(200).json(clubs);
    });
  }
});

//show information of a club
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(404).json({status:"not logged in"});
  } else{
    Club.findOne({_id:req.params.id})
    .exec((err,club)=>{
      if(err) throw err;
      res.status(200).json(club);
      
    });
  }
});

module.exports = router;
