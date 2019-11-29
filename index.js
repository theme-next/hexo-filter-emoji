/* global hexo */

'use strict'

const _ = require('lodash');
const path = require('path');
const fs = require('fs');

var options = Object.assign({
  enable   : true,
  className: 'emoji',
}, hexo.config.emoji);

if (options.enable !== false) {
  const emojis = Object.assign(
    require('./emojis.json'),
    loadCustomEmojis(options.customEmojis || options.localEmojis)
  );

  fs.writeFile(
    path.join(__dirname, 'emojis.json'),
    JSON.stringify(emojis),
    function (err) { err && console.warn(err) }
  );

  hexo.extend.filter.register('before_post_render', data => {
    if (data['no-emoji']) return data;

    data.content = data.content.replace(
      /:(\w+):/ig,
      (match, p1) => emojis[p1] ? renderEmoji(emojis, p1) : match
    );

    return data;
  });

  hexo.extend.helper.register('emoji', name => renderEmoji(emojis, name));
  hexo.extend.tag.register('emoji', args => renderEmoji(emojis, args[0]));
}

function loadCustomEmojis(customEmojis) {
  // JSON string
  if (_.isString(customEmojis)) {
    try {
      customEmojis = JSON.parse(customEmojis);
      Object.keys(customEmojis).forEach(name => {
        if (_.isString(customEmojis[name])) {
          customEmojis[name] = {
            src: customEmojis[name],
          }
        }
      });
    } catch (err) {
      customEmojis = {};
      console.warn('hexo-filter-emoji: Custom emojis not valid. Skipped.');
    }
  }

  if (!_.isObject(customEmojis)) {
    customEmojis = {};
  }

  Object.values(customEmojis).forEach(emoji => {
    if (emoji.codepoints && !_.isArray(emoji.codepoints)) {
      emoji.codepoints = emoji.codepoints.split(' ');
    }
  });
}

function renderEmoji(emojis, name) {
  if (!emojis[name]) return name;

  const styles = _.isObject(options.styles)
    ? Object.keys(options.styles)
      .filter(k => _.isString(options.styles[k]))
      .map(k => k + ': ' + options.styles[k])
    : [];

  //styles.push(`background-image: url(${emojis[name].src})`);

  const codepoints = emojis[name].codepoints
    ? emojis[name].codepoints.map(c => `&#x${c};`).join('')
    : ' ';

  return `<span class="${options.className}" alias="${name}" style="${styles.join('; ')}" fallback-src="${emojis[name].src}">${codepoints}</span>`;
}
