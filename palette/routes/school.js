//router of school
var express = require('express');
var router = express.Router();
var School = require('../models/School');
var Major = require('../models/Major');

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
