var express = require('express');
var router = express.Router();
var Club = require('../newModels/Club_new');
var multer = require('multer');
var upload = multer({dest:'./upload'});

router.get('/', (req,res)=>{
  Club.find(req.query).exec((err,clubs)=>{
    if(err) throw err;
    else res.status(200).json(clubs);
  });
});


router.post('/create', upload.array('files'),(req,res)=>{
  
  var newClub = new Club();
  newClub.name = req.body.name;
  //다중이미지처리? 일단 이렇게 함.
  newClub.photos = req.files;
  newClub.description = req.body.description;
  newClub.logo = req.body.logo;
  newClub.school = req.body.school;

  newClub.saveClub((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'club create complete'});
  });
});

router.post('/update', (req,res)=>{
  Club.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedClub)=>{
    if(err) res.status(500).json(err);
    else{
      updatedClub.saveClub();
      res.status(200).json({status:'club update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Club.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'club delete complete'});
  });
});


router.get('/:id', (req,res)=>{
  Club.findById(req.params.id).exec((err,club)=>{
    if(err) throw err;
    else res.status(200).json(club);
  });
});

module.exports = router;