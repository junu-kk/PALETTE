var express = require('express');
var router = express.Router();
var School = require('../newModels/School_new');
var multer = require('multer');
var upload = multer({dest:'./upload'});

router.get('/', (req,res)=>{
  if(req.query.id){
    School.findOne({_id:req.query.id}).exec((err,school)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(school);
    })
  } else{
    School.find({}).exec((err,schools)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(schools);
    });
  }
});

router.post('/create', upload.array('files'),(req,res)=>{
  var newSchool = new School();
  newSchool.name = req.body.name;
  newSchool.introduce = req.body.introduce;
  //다중이미지처리?
  newSchool.photos = req.files;
  //원래 school이 먼저 있고 그다음에 클럽이 있는게 아닌가?
  newSchool.clubs = req.body.clubs;

  newSchool.saveSchool((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'school create complete'});
  });
});

router.post('/update', (req,res)=>{
  School.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedSchool)=>{
    if(err) res.status(500).json(err);
    else{
      updatedSchool.saveSchool();
      res.status(200).json({status:'school update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  School.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'school delete complete'});
  });
});

module.exports = router;