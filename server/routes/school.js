//router of school
var express = require('express');
var router = express.Router();
var School = require('../models/School');


//shows list of schools
router.get('/', (req, res, next)=> {
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  School.find({}).exec((err,schools)=>{
    if(err) throw err;

    res.send(schools);
    /*
    return res.render('school', {ct:{
      schools:schools,
    }});
    */
  });
});

//shows information of school
router.get('/:id',(req,res,next)=>{
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  School.findOne({_id:req.params.id})
  .populate('clubs')
  .exec((err,school)=>{
    if(err) throw err;
    res.send(school);
    /*
    return res.render('school/show', {ct:{
      school:school,
    }});
    */
  });
});



module.exports = router;
