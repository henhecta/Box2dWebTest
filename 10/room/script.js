const Peer = window.Peer;
let url = new URL(location.href);
document.getElementById('js-room-id').value = url.searchParams.get("roomid");
window.__SKYWAY_KEY__ = url.searchParams.get("skywaykey");

var panners = {};
var myloc = [100, 100, 0];
var pannerlocs = {};
var prevsendtime = new Date();
var ns = 'http://www.w3.org/2000/svg';
(async function main() {
  //const localVideo = document.getElementById('js-local-stream');
  const joinTrigger = document.getElementById('js-join-trigger');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const remoteVideos = document.getElementById('js-remote-streams');
  const roomId = document.getElementById('js-room-id');
  const roomMode = document.getElementById('js-room-mode');
  const localText = document.getElementById('js-local-text');
  const sendTrigger = document.getElementById('js-send-trigger');
  const messages = document.getElementById('js-messages');
  const meta = document.getElementById('js-meta');
  const roomView = document.getElementById('room-view');
  const sdkSrc = document.querySelector('script[src*=skyway]');

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();

  const getRoomModeByHash = () => (location.hash === '#sfu' ? 'sfu' : 'mesh');

  roomMode.textContent = getRoomModeByHash();
  window.addEventListener(
    'hashchange',
    () => (roomMode.textContent = getRoomModeByHash())
  );

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false,
    })
    .catch(console.error);

  // Render local stream
  //localVideo.muted = true;
  //localVideo.srcObject = localStream;
  //localVideo.playsInline = true;
  //await localVideo.play().catch(console.error);

  
  // eslint-disable-next-line require-atomic-updates
  const peer = (window.peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3,
  }));


  // Register join handler
  joinTrigger.addEventListener('click', () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const room = peer.joinRoom(roomId.value, {
      mode: getRoomModeByHash(),
      stream: localStream,
    });

    room.once('open', () => {
      messages.textContent += '=== You joined ===\n';
    });
    room.on('peerJoin', peerId => {
      messages.textContent += `=== ${peerId} joined ===\n`;
    });

    // Render remote stream for new peer join in the room
    room.on('stream', async stream => {
      const audioContext = new AudioContext({latencyHint:0.05});

      // panner
      const panner = new PannerNode(audioContext, {panningModel:"HRTF"});
      panner.coneInnerAngle = 120;
      panner.coneOuterAngle = 180;
      panner.coneOuterGain = 0.3;
      panner.maxDistance = 1000;
      panner.distanceModel = 'inverse';
      panner.refDistance = 10;
      panner.rolloffFactor = 1;
      // getUserMediaで取得したMediaStreamからMediaStreamAudioSourceNodeを生成
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
    
      // MediaStreamAudioSourceNodeをBiquadFilterNodeに、BiquadFilterNodeをAudioContext.destinationに接続する
      // AudioContext.destinationはブラウザの出力先を示しており、ここに音を流せばブラウザから出力される
      mediaStreamSource.connect(panner).connect(audioContext.destination);
    
      const newVideo = document.createElement('video');
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      // HTML側で属性の指定をした場合は不要
      newVideo.addEventListener('loadedmetadata', e => {
        newVideo.muted = true; // streamの加工前音声を無効化
        newVideo.play();
      });
      // mark peerId to find it later at peerLeave event
      newVideo.setAttribute('data-peer-id', stream.peerId);
      newVideo.style.display = "none";
      remoteVideos.append(newVideo);
      await newVideo.play().catch(console.error);

      panners[stream.peerId] = panner;

      let mark = document.createElementNS(ns, 'path');
      mark.setAttributeNS(null, 'stroke', 'none');
      mark.setAttributeNS(null, 'fill', 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')');
      mark.setAttributeNS(null, 'd', "M20 0 L -20 8 L -20 -8");
      mark.setAttributeNS(null, 'transform', 'translate(100,100)rotate(0)');
      mark.setAttributeNS(null, 'id', stream.peerId);
      roomView.appendChild(mark);
      pannerlocs[stream.peerId] = [100, 100, 0];
    });

    room.on('data', ({ data, src }) => {
      let mark = document.getElementById(src);
      datas = data.split(',');
      if (datas.length == 4) {
        if (mark == null) {
          //pannerlocs[src] = loc;
        } else {
          mark.setAttributeNS(null, 'transform', 'translate(' + datas[1] + ',' + datas[2] + ')rotate(' + datas[3] + ')');
          let loc = [Number(datas[1]), Number(datas[2]), Number(datas[3]) / 180.0 * Math.PI];
          console.log(loc);
          panners[src].setPosition(
            (loc[0] - myloc[0]) * Math.cos(myloc[2]) - (loc[1] - myloc[1]) * Math.sin(myloc[2]),
            (loc[0] - myloc[0]) * Math.sin(myloc[2]) + (loc[1] - myloc[1]) * Math.cos(myloc[2]),
            0);
          panners[src].setOrientation(Math.cos(loc[2] - myloc[2]), Math.sin(loc[2] - myloc[2]), 0);
          pannerlocs[src] = loc;
        }
      } else {
        // Show a message sent to the room and who sent
        messages.textContent += `${src}: ${data}\n`;
      }
    });

    // for closing room members
    room.on('peerLeave', peerId => {
      const remoteVideo = remoteVideos.querySelector(
        `[data-peer-id=${peerId}]`
      );
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();

      let mark = document.getElementById(peerId);
      mark.remove();
      delete panners[peerId];
      delete pannerlocs[peerId];
      
      messages.textContent += `=== ${peerId} left ===\n`;
    });

    // for closing myself
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      messages.textContent += '== You left ===\n';
      Array.from(remoteVideos.children).forEach(remoteVideo => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });

    sendTrigger.addEventListener('click', onClickSend);
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(localText.value);

      messages.textContent += `${peer.id}: ${localText.value}\n`;
      localText.value = '';
    }

    function updateme() {
      let mark = document.getElementById('me');
      mark.setAttributeNS(null, 'transform', 'translate(' + myloc[0] + ',' + myloc[1] + ')rotate(' + (myloc[2] * 180 / Math.PI) + ')');
      
      for (let key in pannerlocs) {
        if (String(key) == 'me') continue;
        panners[key].setPosition(
          (pannerlocs[key][0] - myloc[0]) * Math.cos(-myloc[2]) - (pannerlocs[key][1] - myloc[1]) * Math.sin(-myloc[2]),
          (pannerlocs[key][0] - myloc[0]) * Math.sin(-myloc[2]) + (pannerlocs[key][1] - myloc[1]) * Math.cos(-myloc[2]),
          0);

        panners[key].setOrientation(Math.cos(pannerlocs[key][2]-myloc[2]),Math.sin(pannerlocs[key][2]-myloc[2]),0);

      }
    }
    function sendme() {
      room.send('pos,'+myloc[0]+','+myloc[1]+','+(myloc[2] * 180 / Math.PI));
      console.log('pos,' + myloc[0] + ',' + myloc[1] + ',' + (myloc[2] * 180 / Math.PI));
    }
    function onMousemove(e) {
      let rect = e.target.getBoundingClientRect();
      let mousex = e.clientX - rect.left;
      let mousey = e.clientY - rect.top;
      let x = mousex - myloc[0];
      let y = mousey - myloc[1];
      if (x == 0 && y == 0) return;
      myloc[2] = Math.atan2(y, x);
      updateme();
      let newtime = new Date();
      if (newtime.getTime() - prevsendtime.getTime() > 300) {
        prevsendtime = newtime;
        sendme();
      }
    }
    function onClick(e) {
      let rect = e.target.getBoundingClientRect();
      let mousex = e.clientX - rect.left;
      let mousey = e.clientY - rect.top;
      myloc[0] = mousex;
      myloc[1] = mousey;
      updateme();
      let newtime = new Date();
      if (newtime.getTime() - prevsendtime.getTime() > 300) {
        prevsendtime = newtime;
        sendme();
      }
    }
    roomView.addEventListener('click', onClick);
    roomView.addEventListener('mousemove', onMousemove);
    prevsendtime = new Date();
    sendme();
  });

  peer.on('error', console.error);


  let mark = document.createElementNS(ns, 'path');
  mark.setAttributeNS(null, 'stroke', 'none');
  mark.setAttributeNS(null, 'fill', 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')');
  mark.setAttributeNS(null, 'd', "M20 0 L -20 8 L -20 -8");
  mark.setAttributeNS(null, 'transform', 'translate(100,100)rotate(0)');
  mark.setAttributeNS(null, 'id', 'me');
  roomView.appendChild(mark);
})();
