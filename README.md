## alert

JavaScript library to play sound alerts 

```js
alert = require('alert')

alert() // Plays default alert "bottle"
alert('purr')
alert.volume(0.5)
```

See `content.js` for all available sounds.

Try it at
* [requirebin](http://requirebin.com/?gist=6050220)
* [jsbin](http://jsbin.com/enobox/1/edit)

## Install

```bash
$ npm install alert
```

## Manual

### Available Sounds

* bottle (default)
* glass
* funk
* morse
* purr
* tink
* submarine

### Adding Custom Sounds

```js
alert.content['foo'] = ['http://bar.com/foo.mp3', 'http://bar.com/foo.ogg']
alert('foo')
```

## How to use without NPM?

If your application isn't structured as a CommonJS package, you can download the distribution file;

```bash
$ wget https://raw.github.com/azer/alert/master/dist/alert.js
```

And include it on your page:

```html
<script src="alert.js"></script>
<script>
  playAlert('purr')
</script>
```

### Accessing Audio API

```js
alert.player.src()
// => foobar.mp3

alert.player.on('ended', function(){})
```

More info is at [azer/play-audio](http://github.com/azer/play-audio)

![](https://dsz91cxz97a03.cloudfront.net/pI9fj5nbY8-1200x1200.jpeg)
