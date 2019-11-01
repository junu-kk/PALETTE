var express = require('express');
var router = express.Router();
var Join = require('../newModels/Join');

router.get('/', (req,res,next)=>{
  Join.find({}).exec((err,joins)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(joins);
  });
});

router.get('/:id', (req,res,next)=>{
  Join.findOne({_id:req.params.id}).exec((err,join)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(join);
  })
})

module.exports = router;