var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
  res.send('working');
});

module.exports=router;