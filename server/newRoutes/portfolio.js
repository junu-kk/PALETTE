var express = require('express');
var router = express.Router();
var Portfolio = require('../newModels/Portfolio');

router.get('/', (req,res)=>{
  if(req.query.id){
    Portfolio.findOne({_id:req.query.id}).exec((err,portfolio)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(portfolio);
    })
  } else{
    Portfolio.find({}).exec((err,portfolios)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(portfolios);
    });
  }
});

router.post('/create', (req,res)=>{
  var newPortfolio = new Portfolio();
  newPortfolio.user = req.body.user

  newPortfolio.savePortfolio((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'portfolio create complete'});
  });
});

router.post('/update', (req,res)=>{
  Portfolio.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedPortfolio)=>{
    if(err) res.status(500).json(err);
    else{
      updatedPortfolio.savePortfolio();
      res.status(200).json({status:'portfolio update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Portfolio.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'portfolio delete complete'});
  });
});

module.exports = router;