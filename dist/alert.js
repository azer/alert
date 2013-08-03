;(function(process){  require.m = { 0:[function(require,module,exports){ window.playAlert = require('./');
 },{"./":1}],1:[function(require,module,exports){ var play    = require('play-audio'),
    content = require('./content'),
    playing = play().autoplay();

module.exports = playAlert;
module.exports.content = content;
module.exports.volume = playing.volume;
module.exports.player = playing;

function playAlert(name){
  name || ( name = 'bottle' );

  if (!content[name]) return;

  playing.src(content[name]);
}
 },{"./content":2,"play-audio":3}],2:[function(require,module,exports){ module.exports = {
  bottle: ['http://i.cloudup.com/y29czRwU3R.m4a', 'http://i.cloudup.com/baNnhH1I7M.ogg'],
  funk: ['http://i.cloudup.com/KkfWRzYC77.m4a', 'http://i.cloudup.com/7SSbOm5XZS.ogg'],
  glass: ['http://i.cloudup.com/E021I9zUG3.m4a', 'http://i.cloudup.com/3gveeCqUD6.ogg'],
  morse: ['http://i.cloudup.com/h7r7MsF4q3.m4a', 'http://i.cloudup.com/b0EXCVaceT.ogg'],
  pop: ['http://i.cloudup.com/vTka9yOizT.m4a', 'http://i.cloudup.com/4TnDj0v9GE.ogg'],
  purr: ['http://i.cloudup.com/5HJSHCtOzZ.m4a', 'http://i.cloudup.com/YdDNGA0sj5.ogg'],
  submarine: ['http://i.cloudup.com/r4ZENSF0Hu.m4a', 'http://i.cloudup.com/2OPb5OYAI2.ogg'],
  tink: ['http://i.cloudup.com/nCtoNq3kJN.m4a', 'http://i.cloudup.com/SNi1RX8iwb.ogg']
};
 },{}],3:[function(require,module,exports){ module.exports = require('./lib/player');
 },{"./lib/player":4}],4:[function(require,module,exports){ var newChain  = require('new-chain'),
    src = require('./src'),
    render = require('./render');

module.exports = play;

function play(urls, dom){
  var el, chain, url;

  dom || ( dom = document.documentElement );
  el = render();
  dom.appendChild(el);

  chain = newChain({
    autoplay: bool('autoplay'),
    controls: bool('controls'),
    load: method('load'),
    loop: bool('loop'),
    muted: bool('muted'),
    on: on,
    pause: method('pause'),
    play: method('play'),
    preload: bool('preload')
  });

  chain.currentTime = attr('currentTime');
  chain.element = element;
  chain.src = src.attr(el);
  chain.volume = attr('volume');
  chain.remove = remove;

  chain.src(urls);

  return chain;

  function attr(name){
    return function(value){
      if ( arguments.length ) {
        el[name] = value;
        return chain;
      }

      return el[name];
    };
  }

  function bool(name){
    return function(value){
      if (value === false) {
        return el[name] = false;
      }

      return el[name] = true;
    };
  }

  function element(){
    return el;
  }

  function on(event, callback){
    el.addEventListener(event, callback, false);
  }

  function method(name){
    return function(){
      return el[name].apply(el, arguments);
    };
  }

  function remove(){
    return el.parentNode.removeChild(el);
  }

}
 },{"./src":5,"./render":7,"new-chain":10}],5:[function(require,module,exports){ var mimeOf = require("./mime");

module.exports = {
  attr: attr,
  pick: pick
};

function attr(el){
  var value;

  return function(urls){
    if (arguments.length) {
      value = urls;
      el.setAttribute('src', pick(el, value));
    }

    return value;
  };
}

function pick(el, urls){
  if(!urls) return;

  if(typeof urls == 'string'){
    return urls;
  }

  return urls.filter(function(url){
    return !!el.canPlayType(mimeOf(url));
  })[0];
}
 },{"./mime":6}],7:[function(require,module,exports){ var domify = require('domify'),
    templates = require("./templates");

module.exports = render;

function render(src){
  return domify(templates['audio.html']);
}
 },{"./templates":8,"domify":9}],8:[function(require,module,exports){ exports["audio.html"] = "<audio preload=\"auto\" /></audio>" },{}],6:[function(require,module,exports){ var table = {
  aif  : "audio/x-aiff",
  aiff : "audio/x-aiff",
  wav  : "audio/x-wav",
  mp3  : 'audio/mpeg',
  m3u  : "audio/x-mpegurl",
  mid  : "audio/midi",
  midi : "audio/midi",
  m4a  : 'audio/m4a',
  ogg  : 'audio/ogg'
};

module.exports = mimeOf;

function mimeOf(url){
  return table[ url.split('.').slice(-1)[0] ];
}
 },{}],10:[function(require,module,exports){ module.exports = newChain;
module.exports.from = from;

function from(chain){

  return function(){
    var m, i;

    m = methods.apply(undefined, arguments);
    i   = m.length;

    while ( i -- ) {
      chain[ m[i].name ] = m[i].fn;
    }

    m.forEach(function(method){
      chain[ method.name ] = function(){
        method.fn.apply(this, arguments);
        return chain;
      };
    });

    return chain;
  };

}

function methods(){
  var all, el, i, len, result, key;

  all    = Array.prototype.slice.call(arguments);
  result = [];
  i      = all.length;

  while ( i -- ) {
    el = all[i];

    if ( typeof el == 'function' ) {
      result.push({ name: el.name, fn: el });
      continue;
    }

    if ( typeof el != 'object' ) continue;

    for ( key in el ) {
      result.push({ name: key, fn: el[key] });
    }
  }

  return result;
}

function newChain(){
  return from({}).apply(undefined, arguments);
}
 },{}],9:[function(require,module,exports){ 
/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  option: [1, '<select multiple="multiple">', '</select>'],
  optgroup: [1, '<select multiple="multiple">', '</select>'],
  legend: [1, '<fieldset>', '</fieldset>'],
  thead: [1, '<table>', '</table>'],
  tbody: [1, '<table>', '</table>'],
  tfoot: [1, '<table>', '</table>'],
  colgroup: [1, '<table>', '</table>'],
  caption: [1, '<table>', '</table>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  th: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
};

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) throw new Error('No elements were generated.');
  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  var els = el.children;
  if (1 == els.length) {
    return el.removeChild(els[0]);
  }

  var fragment = document.createDocumentFragment();
  while (els.length) {
    fragment.appendChild(el.removeChild(els[0]));
  }

  return fragment;
}
 },{}] }; function require(o){ if(o[2]) return o[2].exports; o[0](function(u){ if(!require.m[o[1][u]]) { throw new Error('Cannot find module "' + u + '"'); } return require(require.m[o[1][u]]); }, o[2] = { exports: {} }, o[2].exports); return o[2].exports; };  return require(require.m[0]); }({ env:{} }));