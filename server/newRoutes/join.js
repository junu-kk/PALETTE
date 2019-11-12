var express = require('express');
var router = express.Router();
var Join = require('../newModels/Join');

router.get('/', (req,res)=>{
  Join.find(req.query).exec((err,joins)=>{
    if(err) throw err;
    else res.status(200).json(joins);
  });
});

router.get('/:id', (req,res)=>{
  Join.findById(req.params.id).exec((err,join)=>{
    if(err) throw err;
    else res.status(200).json(join);
  });
});

//일단 지금은 단순하게 만들었지만, join은 언제 만들어야 하는지 생각해보자.
router.post('/create', (req,res)=>{
  var newJoin = new Join();
  newJoin.auth_level = req.body.auth_level;
  newJoin.club = req.body.club;
  newJoin.student = req.body.student;

  newJoin.saveJoin((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'join create complete'});
  });
});

router.post('/update', (req,res)=>{
  Join.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedJoin)=>{
    if(err) res.status(500).json(err);
    else{
      updatedJoin.saveJoin();
      res.status(200).json({status:'join update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Join.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'join delete complete'});
  });
});

module.exports = router;