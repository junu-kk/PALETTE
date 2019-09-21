//router of index page
var express = require('express');
var router = express.Router();

//shows index page
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'PALETTE' });
});

module.exports = router;
