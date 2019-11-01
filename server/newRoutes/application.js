var express = require('express');
var router = express.Router();
var Application = require('../newModels/Application_new');

router.get('/', (req,res,next)=>{
  Application.find({}).exec((err,applications)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(applications);
  });
});

router.get('/:id', (req,res,next)=>{
  Application.findOne({_id:req.params.id}).exec((err,application)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(application);
  })
})

module.exports = router;