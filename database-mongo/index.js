var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test',
  {useMongoClient: true });

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var imageSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  thumbnail: String
});

var Image = mongoose.model('Image', imageSchema);

// var newImage = new Image({
//   id: 123,
//   thumbnail: 'www.url.com/thumbnail/hi'
// });

// newImage.save(function(err, results) {
//   if (err) {
//     console.log('error on save: ', err)
//   } else {
//     console.log('success on save: ', results);
//   }
// })

var save = function(images) {
  return Promise.all(images.map((img) => {
    
    var query = {id: img.id};
    var update = {
      id: img.id,
      thumbnail: img.thumbnail
    };
    var options = {upsert: true};
    
    return Image.findOneAndUpdate(query, update, options).exec()
    .then((result) => {
      console.log('success in inserting new image into db: ', result);
    })
    .catch((err) => {
      console.log('duplicate entry: ', err);
    })
  }))
  .then(() => {
    return images;
  })
};

var select10 = function(callback) {
  return Image.find({}).limit(10).exec()
  .then((result) => {
    console.log('success in selecting all: ', result);
    return result;
  })
  .catch((err) => {
    console.log('not able to select all: ', err);
  })
  
  // Image.find({}, function(err, Images) {
  //   if(err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, Images);
  //   }
  // });
};

module.exports.save = save;