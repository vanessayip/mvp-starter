const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('../config.js');

module.exports.getImages = function (term) {
  console.log('inside getimages, search term: ', term);
  return request.getAsync({
    url: 'https://api.gettyimages.com/v3/search/images',
    headers: {
      'Accept': 'application/json',
      'Api-Key': `${config.key}`
    },
    qs: {
      fields: 'display_set',
      fields: 'date_camera_shot',
      fields: 'detail_set', //fields is originally an array, but need to separate it out like this b/c these get appended to the url
      phrase: term,
      embed_content_only: true,
      exclude_nudity: true,
      graphical_styles: 'photography',
      page_size: 10,
      sort_order: 'most_popular' 
    },
  })
  .then((res) => {
    // console.log('after get to api, res.body: ', res.body);
    let parsedBody = JSON.parse(res.body);
    let collection = [];
    // console.log('parsebody', parsedBody.images);
    for (var img of parsedBody.images) {
      let image = {
        id: img.id,
        caption: img.caption || 'no caption',
        title: img.title,
        city: img.city,
        country: img.country,
        state_province: img.state_province,
        thumbnail: img.display_sizes[2].uri,
        date_created: img.date_created,
        starred: false
      }
      collection.push(image);
    }
    // console.log('collection: ', collection)
    return Promise.resolve(collection);
  })
  // .then((collection) => {
  //   console.log('collection ', collection, 'done collection')
  //   return Promise.resolve('hi')
  // })
  .catch((err) => {
    console.log('inside err of getImages');
  });
}

// module.exports.getImages('waterfalls');