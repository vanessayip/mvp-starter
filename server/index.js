var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var ghetty = require('../helpers/ghetty.js');
var bodyParser = require('body-parser')

var app = express();

// app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/images', function (req, res) {
  console.log('inside post, req.body: ', req.body);
  
  return ghetty.getImages('dogs')
  .then((images) => {
    console.log('images inside post: ', images);
  })
  .catch((err) => {
    console.log('error in getting images for post: ', err);
  });
});

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

