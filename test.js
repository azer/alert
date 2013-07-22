var alert   = require("./"),
    content = require('./content');

it('plays the default alert', function(done){

  var once = true;
  alert.player.on('ended', function(){
    if(!once) return;
    once = false;

    expect(alert.player.src()).to.deep.equal(content['bottle']);
    done();
  });
  alert();
});

it('plays the specified alert', function(done){
  alert.player.on('ended', function(){
    expect(alert.player.src()).to.deep.equal(content['purr']);
    done();
  });

  alert('purr');
  alert.player.play();
});
