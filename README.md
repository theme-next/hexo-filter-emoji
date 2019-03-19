# hexo-filter-emoji

[![Npm Version](https://img.shields.io/npm/v/hexo-filter-emoji.svg)](https://npmjs.org/package/hexo-filter-emoji)
[![Npm Downloads Month](https://img.shields.io/npm/dm/hexo-filter-emoji.svg)](https://npmjs.org/package/hexo-filter-emoji)
[![Npm Downloads Total](https://img.shields.io/npm/dt/hexo-filter-emoji.svg)](https://npmjs.org/package/hexo-filter-emoji)
[![License](https://img.shields.io/npm/l/hexo-filter-emoji.svg)](https://npmjs.org/package/hexo-filter-emoji)

A Hexo plugin that adds emoji support, using [Github Emojis API](https://api.github.com/emojis).

Check out the [Emoji Cheat Sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/) for all the emojis it supports.

## Installation

``` bash
$ npm install hexo-filter-emoji --save
```

## Options

You can configure this plugin in `_config.yml`. Default options:

``` yaml
githubEmojis:
  enable: true
  className: github-emoji
  inject: true
  styles:
  customEmojis:
```

- **className** - Image class name. For example :sparkles: `:sparkles:` the filter will generate something like this:

  ```html
  <span class="github-emoji" style="background-image:url(https://assets-cdn.github.com/images/icons/emoji/unicode/2728.png?v8)" data-src="https://assets-cdn.github.com/images/icons/emoji/unicode/2728.png?v8">&#x2728;</span>
  ```

- **inject** - If true, the filter will inject proper inline styles and a script to fallback when image loading fails. If you can modify script files and style files, you may turn this off and add them yourself.

  ```html
  <span class="github-emoji" style="color:transparent;background:no-repeat url(...) center/contain" ...>
  ```
  
  A script tag will be appended, the className changes according to the options:

  ```html
    <script>
      document.querySelectorAll('.github-emojis')
        .forEach(el => {
          if (!el.dataset.src) { return; }
          const img = document.createElement('img');
          img.style = 'display:none !important;';
          img.src = el.dataset.src;
          img.addEventListener('error', () => {
            img.remove();
            el.style.color = 'inherit';
            el.style.backgroundImage = 'none';
            el.style.background = 'none';
          });
          img.addEventListener('load', () => {
            img.remove();
          });
          document.body.appendChild(img);
        });
    </script>
  ```

- **styles** - inline styles. For example:

  ```yaml
  githubEmojis:
    styles:
      font-size: 2em
      font-weight: bold
  ```

  outputs:

  ```html
  <span class="github-emoji" style="font-size:2em;font-weight:bold;background-image:url(...)" ...>
  ```

- **customEmojis** - You can specify your own list. An object or JSON string is valid. The filter will first check the `customEmojis` then fallback to the [Github Emojis][ghemojis] list.

  For example:

  ```yaml
  githubEmojis:
    customEmojis:
      arrow_left: https://path/to/arrow_left.png
      arrow_right: https://path/to/arrow_right.png
  ```

  If you need to add code points that are not in the Github list, you can do this:

  ```yaml
  githubEmojis:
    customEmojis:
      man_juggling:
        src: https://path/to/man_juggling.png
        codepoints: ["1f939", "2642"]
      arrow_right: https://path/to/arrow_right.png
  ```

## Tag

If you do not like the `::`-style keywords, you can always use tags:

```html
{% github_emoji sparkles %}
```

Add `no-emoji: true` to front-matter to stop replacing `::`:

```md
---
title: Hello World
no-emoji: true
---

:tada: as it is.

{% github_emoji tada %} still works.
```

## Helper

You can also render a GitHub emoji from a template using the `github_emoji` helper:

```html
<h1><% github_emoji('octocat') %></h1>
```

## Credits

[hexo-filter-github-emojis](https://github.com/crimx/hexo-filter-github-emojis), Author: [crimx](https://github.com/crimx).
