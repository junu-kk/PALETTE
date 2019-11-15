var express = require('express');
var router = express.Router();
var Certificate = require('../newModels/Certificate');
var multer = require('multer');
var upload = multer({dest:'./upload'});

router.get('/', (req,res)=>{
  Certificate.find(req.query).exec((err,certificates)=>{
    if(err) throw err;
    else res.status(200).json(certificates);
  });
});

router.post('/create', upload.single('file'),(req,res)=>{
  let image = '/image/'+req.file.filename;

  var newCertificate = new Certificate();
  newCertificate.type = req.body.type;
  newCertificate.description = req.body.description;
  newCertificate.issue_date = req.body.issue_date;
  //사진업로드처리 잊지말자.
  newCertificate.photo = image;
  newCertificate.portfolio = req.body.portfolio;
  newCertificate.issuer = req.body.issuer;

  newCertificate.saveCertificate((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'certificate create complete'});
  });
});

router.post('/update', (req,res)=>{
  Certificate.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedCertificate)=>{
    if(err) res.status(500).json(err);
    else{
      updatedCertificate.saveCertificate();
      res.status(200).json({status:'certificate update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Certificate.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'certificate delete complete'});
  });
});


router.get('/:id', (req,res)=>{
  Certificate.findById(req.params.id).exec((err,certificate)=>{
    if(err) throw err;
    else res.status(200).json(certificate);
  });
});

module.exports = router;