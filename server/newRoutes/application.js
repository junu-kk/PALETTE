var express = require('express');
var router = express.Router();
var Application = require('../newModels/Application_new');

router.get('/', (req,res,next)=>{
  Application.find({}).exec((err,applications)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(applications);
  });
});

router.get('/:id', (req,res,next)=>{
  Application.findOne({_id:req.params.id}).exec((err,application)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(application);
  })
})

router.post('/create', (req,res,next)=>{
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

router.post('/delete/:id', (req,res,next)=>{
  Application.findOneAndDelete({_id:req.params.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'application delete complete'});
  });
});

module.exports = router;