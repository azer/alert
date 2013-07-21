## alert

JavaScript library to play sound alerts 

```js
alert = require('alert')

alert() // Plays default alert "bottle"
alert('purr')
alert.volume(0.5)
```

See `content.js` for all available sounds.

Try it at [requirebin]()

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
alert.content['foo'] = 'http://bar.com/foo.mp3'
alert('foo')
```

### Accessing Audio API

```js
alert.player.src()
// => foobar.mp3

alert.player.on('ended', function(){})
```

More info is at [azer/play-audio](http://github.com/azer/play-audio)

![](https://dsz91cxz97a03.cloudfront.net/pI9fj5nbY8-1200x1200.jpeg)
