var express = require('express');
var router = express.Router();
var Portfolio = require('../newModels/Portfolio');

router.get('/', (req,res,next)=>{
  Portfolio.find({}).exec((err,portfolios)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(portfolios);
  });
});

router.get('/:id', (req,res,next)=>{
  Portfolio.findOne({_id:req.params.id}).exec((err,portfolio)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(portfolio);
  })
})

module.exports = router;