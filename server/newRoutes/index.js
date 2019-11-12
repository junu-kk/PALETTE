var express = require('express');
var router = express.Router();
var School = require('../newModels/School_new');

router.get('/', (req,res)=>{
  res.status(200).json({status:'works well'});
});

router.get('/querytest', (req,res)=>{
  if(req.query){
    console.log(req.query);
    School.find(req.query).exec((err,schools)=>{
      if(err) throw err;
      else res.status(200).json(schools);
    })
    //res.status(200).json(req.query);
    //res.status(200).json({queryID:req.query.id,queryName:req.query.name});
  } else{
    res.status(200).json({queryID:"merong"});
  }
  
});

module.exports=router;