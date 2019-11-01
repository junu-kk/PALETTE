var express = require('express');
var router = express.Router();
var Club = require('../newModels/Club_new');

router.get('/', (req,res,next)=>{
  Club.find({}).exec((err,clubs)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(clubs);
  });
});

router.get('/:id', (req,res,next)=>{
  Club.findOne({_id:req.params.id}).exec((err,club)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(club);
  })
})

module.exports = router;