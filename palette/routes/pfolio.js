//router of portfolio
//사진 마치는대로 작업해야함!
var express = require('express');
var router = express.Router();

//shows portfolio page
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  return res.render('pfolio');
});

module.exports = router;
