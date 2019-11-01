var express = require('express');
var router = express.Router();
var Certificate = require('../newModels/Certificate');

router.get('/', (req,res,next)=>{
  Certificate.find({}).exec((err,certificates)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(certificates);
  });
});

router.get('/:id', (req,res,next)=>{
  Certificate.findOne({_id:req.params.id}).exec((err,certificate)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(certificate);
  })
})

module.exports = router;