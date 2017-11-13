var express = require('express');
var app = express();
const Promise = require('bluebird');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index.js');
var ghetty = require('../helpers/ghetty.js');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/images', function (req, res) {
  console.log('inside post, req.body: ', req.body);
  
  return ghetty.getImages(req.body.searchTerm)
  .then((images) => {
    // console.log('images inside post: ', images);
    // res.send(images);
    return db.save(images)
  })
  .then((result) => {
    // console.log('done updating the db: ', result);
    res.send(result);
  })
  .catch((err) => {
    console.log('error in getting images for post: ', err);
  });
});

app.get('/images', function (req, res) {
  return db.select10()
  .then((result) => {
    console.log('done retrieving from db: ', result);
    res.send(result);
  })
  .catch((err) => {
    console.log('error in retrieving from db: ', err);
  });
});

app.post('/starred', function (req, res) {
  console.log('inside post of starred: ', req.body);
  return db.updateStar(req.body.toogleStar, req.body.id)
  .then((result) => {
    console.log('done updating the db from star: ', result);
    return db.select10();
  })
  .then((result) => {
    console.log('done retrieving starred from db: ', result);
    res.send(result);
  })
  .catch((err) => {
    console.log('error in getting images for post from star: ', err);
  });

});

// app.get('/loadStar', function (req, res) {
//   return db.selectStar()
//   .then((result) => {
//     console.log('done retrieving from db: ', result);
//     // res.send(result);
//   })
//   .catch((err) => {
//     console.log('error in retrieving from db: ', err);
//   });
// });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

