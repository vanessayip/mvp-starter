const request = require('request');
const Promise = require('bluebird');

module.exports.getPins = function (term) {
  request.get({
    url:,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(res => {
    console.log('res.body: ', res.body);
  })
  .catch((err) => {
    console.log('inside err of getPins');
  });
}

module.exports.getPins('waterfalls');