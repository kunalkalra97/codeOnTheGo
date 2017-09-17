var express = require('express');
var fs = require('fs');
var router = express.Router();

function generateRandomTag() {

  var tag = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    tag += possible.charAt(Math.floor(Math.random() * possible.length));

  return tag;
}

router.get('/*', function(req, res, next) {
  
  if(req.path.length == 1) {
    res.render('index');
    return;
  }

  var fileTag = req.path.slice(1, req.path.length);
  var fileNameWithDirectory = './files/'+fileTag+'.txt';

  fs.readFile(fileNameWithDirectory, 'utf-8', function(err, data) {

  	if(err) throw err;

  	var code = data.toString('utf-8');
  	
  	res.end(code);

  });

});

router.post('/saveFile', function(req, res, next) {
  
  var fileText = req.body.code;
  var fileTag = generateRandomTag();
  var fileNameWithDirectory = './files/'+fileTag+'.txt';

  fs.writeFile(fileNameWithDirectory, fileText, 'utf-8', function (err) {
  	
  	if(err) throw err;
  	res.render('displayTagname', {"tagName":fileTag});

  });
  
});


module.exports = router;