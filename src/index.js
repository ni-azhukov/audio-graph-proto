import 'babel-polyfill';
import {html, render} from '@modulor-js/html';

(async () => {
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    console.log('getUserMedia not supported on your browser!');
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  var mediaRecorder = new MediaRecorder(stream);

  const start = () => {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log('recorder started');
  };

  const stop = () => {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log('recorder stopped');
  };

  render(
    html`
      <button onclick=${start}>start</button>
      <button onclick=${stop}>stop</button>
      <div>
        <${({mediaRecorder}) => {
          return range => {
            var chunks = [];

            mediaRecorder.addEventListener('dataavailable', (e) => {
              console.log(e.data);
              chunks.push(e.data);
            });

            mediaRecorder.addEventListener('stop', (e) => {
              console.log('recorder stopped');

              var clipName = prompt('Enter a name for your sound clip');

              var clipContainer = document.createElement('article');
              var clipLabel = document.createElement('p');
              var audio = document.createElement('audio');
              var deleteButton = document.createElement('button');

              clipContainer.classList.add('clip');
              audio.setAttribute('controls', '');
              deleteButton.innerHTML = 'Delete';
              clipLabel.innerHTML = clipName;

              clipContainer.appendChild(audio);
              clipContainer.appendChild(clipLabel);
              clipContainer.appendChild(deleteButton);

              var blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
              chunks = [];
              var audioURL = window.URL.createObjectURL(blob);
              audio.src = audioURL;

              render(clipContainer, range);
              deleteButton.onclick = function(e) {
                var evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
              };
            });
          };
        }} mediaRecorder=${mediaRecorder}>
      </div>
      </${''}>
    `,
    document.querySelector('#app'),
  );
})();

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');
  navigator.mediaDevices
    .getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true,
      },
    )

    // Success callback
    .then(function(stream) {
      console.log(stream);
    })

    // Error callback
    .catch(function(err) {
      console.log('The following getUserMedia error occured: ' + err);
    });
} else {
}
