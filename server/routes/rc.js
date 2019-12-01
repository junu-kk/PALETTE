//router of residential college
//not in progress
var express = require('express');
var router = express.Router();

//
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  return res.render('rc', {active: ['rc']});
});

module.exports = router;
