var express = require('express');
var router = express.Router();
var Notice = require('../newModels/Notice');
var multer = require('multer');
var upload = multer({dest:"./upload"});


router.get('/', (req,res)=>{
  if(req.query.id){
    Notice.findOne({_id:req.query.id}).exec((err,notice)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(notice);
    })
  } else{
    Notice.find({}).exec((err,notices)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(notices);
    });
  }
  
});

router.post('/create', upload.array('files'),(req,res)=>{
  var newNotice = new Notice();
  newNotice.priority = req.body.priority;
  newNotice.title = req.body.title;
  newNotice.text = req.body.text;
  //다중이미지처리?
  newNotice.photos = req.files;
  newNotice.author = req.body.author;
  newNotice.created = req.body.created;
  newNotice.writer = req.body.writer;

  newNotice.saveNotice((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'notice create complete'});
  });
});

router.post('/update', (req,res)=>{
  Notice.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedNotice)=>{
    if(err) res.status(500).json(err);
    else{
      updatedNotice.saveNotice();
      res.status(200).json({status:'notice update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Notice.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'notice delete complete'});
  });
});

module.exports = router;