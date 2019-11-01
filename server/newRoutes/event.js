var express = require('express');
var router = express.Router();
var Event = require('../newModels/Event');

router.get('/', (req,res,next)=>{
  Event.find({}).exec((err,events)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(events);
  });
});

router.get('/:id', (req,res,next)=>{
  Event.findOne({_id:req.params.id}).exec((err,event)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(event);
  })
})

module.exports = router;