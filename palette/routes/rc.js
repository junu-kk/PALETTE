var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  return res.render('rc');
});

module.exports = router;
