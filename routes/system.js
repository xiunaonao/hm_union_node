var express = require('express');
let crypto = require('crypto');
var router = express.Router();

/* GET users listing. */
router.get('/getUser', function(req, res, next) {
  var json={};
  var token=req.query.token;
  console.log('密钥：'+token);


  res.json({success:0});
});

module.exports = router;
