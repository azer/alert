var alert   = require("./"),
    content = require('./content');

it('plays the default alert', function(done){
  alert.player.on('ended', function(){
    expect(alert.player.src()).to.equal(content['bottle']);
    done();
  });
  alert();
});

it('plays the specified alert', function(done){
  alert.player.on('ended', function(){
    expect(alert.player.src()).to.equal(content['purr']);
    done();
  });

  alert('purr');
});
