var express = require('express');
var router = express.Router();
var Application = require('../newModels/Application_new');

// 슬래쉬 다음에 쿼리나오는건 ㄹㅇ루다가 조건에 맞는 검색
// 슬래쉬 :id는 그 아이디로 user 상세조회


router.get('/', (req,res)=>{
  Application.find(req.query).exec((err,applications)=>{
    if(err) throw err;
    else res.status(200).json(applications);
  });
});


router.post('/create', (req,res)=>{
  var newApplication = new Application();
  newApplication.form = req.body.form;
  newApplication.user = req.body.user;
  newApplication.competition = req.body.competition;
  newApplication.event = req.body.event;
  newApplication.club = req.body.club;

  newApplication.saveApplication((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'application create complete'});
  });
});

router.post('/update', (req,res)=>{
  Application.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedApplication)=>{
    if(err) res.status(500).json(err);
    else{
      updatedApplication.saveApplication();
      res.status(200).json({status:'application update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Application.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'application delete complete'});
  });
});


router.get('/:id', (req,res)=>{
  Application.findById(req.params.id).exec((err,application)=>{
    if(err) throw err;
    else res.status(200).json(application);
  });
});

module.exports = router;