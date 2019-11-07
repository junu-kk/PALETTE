var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
  res.status(200).json({status:'works well'});
});

router.get('/querytest', (req,res)=>{
  if(req.query.id){
    res.status(200).json({queryID:req.query.id,queryName:req.query.name});
  } else{
    res.status(200).json({queryID:"merong"});
  }
  
});

module.exports=router;