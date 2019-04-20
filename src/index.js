import 'babel-polyfill';
import {html, render} from '@modulor-js/html';

import audioCapturer from './components/audioCapturer';
import audioVisualiser from './components/audioVisualiser';


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
        <${audioVisualiser} stream=${stream} />
      </div>
      <div>
        <${audioCapturer} mediaRecorder=${mediaRecorder} />
      </div>
    `,
    document.querySelector('#app'),
  );
})();
