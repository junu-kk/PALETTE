//router for club
var express = require('express');
var router = express.Router();
var Club = require('../models/Club');

//show list of clubs
router.get('/', (req, res, next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  if(req.query.my === 'true') {
    Club.find({
      '_id': {$in: req.user.clubs}
    }).exec((err, clubs) => {
      if (err) throw err;

      return res.render('club/new', {
        ct: {
          clubs: clubs,
        },
        active: ['club', 'my_club']
      })
    })
  } else {
    Club.find({}).exec((err, clubs) => {
      if (err) throw err;

      return res.render('club/new', {
        ct: {
          clubs: clubs,
        },
        active: ['club', 'search_club']
      });
    });
  }
});

//show information of a club
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Club.findOne({_id:req.params.id})
  .populate('school')
  .exec((err,club)=>{
    if(err) throw err;
    return res.render('club/newshow', {ct:{
      club:club,
    }, ids: ['club']});
  });
});


module.exports = router;
