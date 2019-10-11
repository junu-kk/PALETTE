//router of school
var express = require('express');
var router = express.Router();
var School = require('../models/School');


//shows list of schools
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    res.status(404).json({status:"not logged in"});
  } else{
    School.find({}).exec((err,schools)=>{
      if(err) throw err;

      res.status(200).json(schools);
    });
  }
});

//shows information of school
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(404).json({status:"not logged in"});
  } else{
    School.findOne({_id:req.params.id})
    .populate('clubs')
    .exec((err,school)=>{
      if(err) throw err;
      res.status(200).json(school);
      
    });
  }
});



module.exports = router;
