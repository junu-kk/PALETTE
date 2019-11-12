var express = require('express');
var router = express.Router();
var Event = require('../newModels/Event');
var multer = require('multer');
var upload = multer({dest:'./upload'});

router.get('/', (req,res)=>{
  Event.find(req.query).exec((err,events)=>{
    if(err) throw err;
    else res.status(200).json(events);
  });
});

router.get('/:id', (req,res)=>{
  Event.findById(req.params.id).exec((err,event)=>{
    if(err) throw err;
    else res.status(200).json(event);
  });
});

router.post('/create', upload.array('files'),(req,res)=>{
  var newEvent = new Event();
  newEvent.name = req.body.name;
  //다중이미지처리?
  newEvent.photos = req.files;
  newEvent.description = req.body.description;
  newEvent.start_date = req.body.start_date;
  newEvent.end_date = req.body.end_date;
  newEvent.location = req.body.location;
  newEvent.created = req.body.created;
  newEvent.organize = req.body.organizer;


  newEvent.saveEvent((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'event create complete'});
  });
});

router.post('/update', (req,res)=>{
  Event.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedEvent)=>{
    if(err) res.status(500).json(err);
    else{
      updatedEvent.saveEvent();
      res.status(200).json({status:'event update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Event.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'event delete complete'});
  });
});

module.exports = router;