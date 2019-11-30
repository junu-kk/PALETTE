//router of index page
var express = require('express');
var router = express.Router();

//shows index page
router.get('/', (req, res, next)=> {
  if(req.isAuthenticated()) {
    return res.redirect('/main');
  } else {
    return res.redirect('/login');
  }
});

module.exports = router;
