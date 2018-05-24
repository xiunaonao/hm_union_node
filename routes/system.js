var express = require('express');
let crypto = require('crypto');
var router = express.Router();

/* GET users listing. */
router.get('/getUser', (req, res, next)=>{
  let json={};
  let token=req.query.token;

  let key='UNIONFROMZJBYHMS';
  let iv='1234567812345678';

  var crypted = new Buffer(token, 'base64').toString('binary');

  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  console.log(decipher)
  var decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  console.log(decoded);
  res.json({success:0,str:decoded,data:{}});
});

module.exports = router;
