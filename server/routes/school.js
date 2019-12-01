//router of school
var express = require('express');
var router = express.Router();
var School = require('../models/School');

//shows list of schools
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  if(req.query.my === 'true') {
    School.findById(req.user.school)
        .populate('clubs')
        .exec((err,school)=>{
          if(err) throw err;
          return res.render('school/newshow', {ct:{
              school:school,
            }})
        });
  } else {
    School.find({}).exec((err, schools) => {
          if (err) throw err;

          return res.render('school/new', {
            ct: {
              schools: schools,
            }
          });
        }
    );
  }
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
    return res.render('school/newshow', {ct:{
      school:school,
    }});
  });
});


module.exports = router;
