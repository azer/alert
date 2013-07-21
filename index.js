var play    = require('play-audio'),
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
