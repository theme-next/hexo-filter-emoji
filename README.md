# hexo-filter-emoji

[![Npm Version](https://img.shields.io/npm/v/hexo-filter-emoji?style=flat-square)](https://npmjs.org/package/hexo-filter-emoji)
[![Npm Downloads Month](https://img.shields.io/npm/dm/hexo-filter-emoji?style=flat-square)](https://npmjs.org/package/hexo-filter-emoji)
[![Npm Downloads Total](https://img.shields.io/npm/dt/hexo-filter-emoji?style=flat-square)](https://npmjs.org/package/hexo-filter-emoji)
[![License](https://img.shields.io/npm/l/hexo-filter-emoji?style=flat-square)](https://npmjs.org/package/hexo-filter-emoji)

A Hexo plugin that adds emoji support, using [Github Emojis API](https://api.github.com/emojis).

Check out the [Emoji Cheat Sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/) for all the emojis it supports.

## Installation

``` bash
$ npm install hexo-filter-emoji
```

## Options

You can configure this plugin in Hexo `_config.yml`. Default options:

``` yaml
emoji:
  enable: true
  className: github-emoji
  styles:
  customEmojis:
```

- **className** - Image class name. For example :sparkles: `:sparkles:` the filter will generate something like this:

  ```html
  <span class="github-emoji" style="background-image: url(https://assets-cdn.github.com/images/icons/emoji/unicode/2728.png?v8)" data-src="https://assets-cdn.github.com/images/icons/emoji/unicode/2728.png?v8">&#x2728;</span>
  ```

- **styles** - inline styles. For example:

  ```yaml
  emoji:
    styles:
      font-size: 2em
      font-weight: bold
  ```

  outputs:

  ```html
  <span class="github-emoji" style="font-size: 2em; font-weight: bold; background-image: url(...)" ...>
  ```

- **customEmojis** - You can specify your own list. An object or JSON string is valid. The filter will first check the `customEmojis` then fallback to the [Github Emojis][ghemojis] list.

  For example:

  ```yaml
  emoji:
    customEmojis:
      arrow_left: https://path/to/arrow_left.png
      arrow_right: https://path/to/arrow_right.png
  ```

  If you need to add code points that are not in the Github list, you can do this:

  ```yaml
  emoji:
    customEmojis:
      man_juggling:
        src: https://path/to/man_juggling.png
        codepoints: ["1f939", "2642"]
      arrow_right: https://path/to/arrow_right.png
  ```

## Tag

If you do not like the `::`-style keywords, you can always use tags:

```html
{% emoji sparkles %}
```

Add `no-emoji: true` to front-matter to stop replacing `::`:

```md
---
title: Hello World
no-emoji: true
---

:tada: as it is.

{% emoji tada %} still works.
```

## Helper

You can also render a GitHub emoji from a template using the `emoji` helper:

```html
<h1>{% emoji('octocat') %}</h1>
```
