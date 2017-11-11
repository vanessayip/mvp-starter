const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const config = require('../config.js');

module.exports.getImages = function (term) {
  let collection = [];
  console.log('inside getimages, search term: ', term);
  return request.getAsync({
    url: 'https://api.gettyimages.com/v3/search/images',
    headers: {
      'Accept': 'application/json',
      'Api-Key': `${config.key}`
    },
    qs: {
      fields: 'detail_set',
      // fields: 'display_set' need to figure out how to make arrays work here
      phrase: 'toronto',
      embed_content_only: true,
      exclude_nudity: true,
      graphical_styles: 'photography',
      page_size: 10,
      sort_order: 'most_popular' 
    },
    // qsStringifyOptions: {arrayFormat: 'brackets'} 
  })
  .then(res => {
    console.log('after get to api, res.body: ');
    let parsedBody = JSON.parse(res.body);
    // console.log('typeof parsebody', parsedBody.images);
    for (var img of parsedBody.images) {
      let image = {
        id: img.id,
        caption: img.caption,
        title: img.title,
        city: img.city,
        country: img.country,
        state_province: img.state_province
      }
      collection.push(image);
    }
    console.log('collection: ', collection)
    return (collection);
  })
  .catch((err) => {
    console.log('inside err of getPins');
  });
}

// module.exports.getImages('waterfalls');