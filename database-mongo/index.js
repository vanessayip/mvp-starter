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
  thumbnail: String,
  caption: String,
  title: String,
  city: String,
  country: String,
  state_province: String,
  starred: Boolean,
  date_created: {type: Date, default: Date.now}
});

var Image = mongoose.model('Image', imageSchema);

module.exports.save = function(images) {
  return Promise.all(images.map((img) => {

    var query = {id: img.id};
    var update = {
      id: img.id,
      thumbnail: img.thumbnail,
      caption: img.caption,
      title: img.title,
      city: img.city,
      country: img.country,
      state_province: img.state_province,
      thumbnail: img.thumbnail,
      date_created: img.date_created,
      starred: img.starred
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

module.exports.select10 = function() {
  return Image.find({}).limit(10).sort({date_created: -1}).exec()
  .then((result) => {
    console.log('success in selecting all: ', result);
    return result;
  })
  .catch((err) => {
    console.log('not able to select all: ', err);
  })
};

// module.exports.selectStar = function() {
//   return Image.find({starred: true}).limit(10).sort({date_created: -1}).exec()
//   .then((result) => {
//     console.log('success in selecting starred: ', result);
//     return result;
//   })
//   .catch((err) => {
//     console.log('not able to select all: ', err);
//   })
// };

module.exports.updateStar = function (starValue, id) {
  var query = {id: id}
  var update = {starred: starValue}

  return Image.findOneAndUpdate(query, update).exec()
  .then((result) => {
    console.log('success in inserting new star value into db: ', result);
  })
  .catch((err) => {
    console.log('couldnt update: ', err);
  })
}
