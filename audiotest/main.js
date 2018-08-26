window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var buffer2 = null;

var getAudioBuffer = function(url) {  
  var req = new XMLHttpRequest();
  req.responseType = 'arraybuffer';
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 0 || req.status === 200) {
        context.decodeAudioData(req.response).then(function(b){buffer2=b;},function(){});
      }
    }
  };
  req.open('GET', url, true);
  req.send('');
};

var playSound = function(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

window.onload = function() {
  getAudioBuffer('p.wav');

    var btn = document.getElementById('btn');
    btn.onclick = function() {
      playSound(buffer2);
    };
};