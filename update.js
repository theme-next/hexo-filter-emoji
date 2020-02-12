const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const https = require('https');
const randomUa = require('random-ua');

// get the latest github version
https.get('https://api.github.com/emojis', {
  headers: {
    'User-Agent': randomUa.generate()
  }
}, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200) {
      parseData(data);
    }
  });
}).on('error', err => {
  console.error('Failded to download Github emojis.');
  console.log(err);
});

function parseData(data) {
  var json = JSON.parse(data);
  if (!_.isObject(json)) {
    console.log('Error parsing JSON!');
  }
  const latestEmojis = Object.keys(json).reduce((emojis, name) => {
    emojis[name] = { src: json[name] }

    const match = /\/unicode\/(\S+)\./.exec(json[name]);
    if (match) {
      emojis[name].codepoints = match[1].split('-');
    }

    return emojis;
  }, {});

  const emojis = _.assign({}, require('./emojis.json'), latestEmojis);

  // update local backup
  fs.writeFile(
    path.join(__dirname, 'emojis.json'),
    JSON.stringify(emojis),
    err => {
      if (err) {
        console.warn(err);
        process.exit(1);
      } else {
        console.log(`Update ${Object.keys(emojis).length} emojis`);
      }
    }
  );
}
