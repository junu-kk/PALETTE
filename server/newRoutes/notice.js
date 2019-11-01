var express = require('express');
var router = express.Router();
var Notice = require('../newModels/Notice');

router.get('/', (req,res,next)=>{
  Notice.find({}).exec((err,notices)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(notices);
  });
});

router.get('/:id', (req,res,next)=>{
  Notice.findOne({_id:req.params.id}).exec((err,notice)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(notice);
  })
})

module.exports = router;