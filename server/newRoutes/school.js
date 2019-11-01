var express = require('express');
var router = express.Router();
var School = require('../newModels/School_new');

router.get('/', (req,res,next)=>{
  School.find({}).exec((err,schools)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(schools);
  });
});

router.get('/:id', (req,res,next)=>{
  School.findOne({_id:req.params.id}).exec((err,school)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(school);
  })
})

module.exports = router;