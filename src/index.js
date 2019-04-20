import 'babel-polyfill';
import {html, render} from '@modulor-js/html';
import Split from 'split.js';

import './index.css';

import audioCapturer from './components/audioCapturer';
import audioVisualiser from './components/audioVisualiser';

(async () => {
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    console.log('getUserMedia not supported on your browser!');
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({audio: true});

  render(
    html`
      <div class="flex">
        <div class="split" id="one">
          ${navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
            ? navigator.mediaDevices
                .enumerateDevices()
                .then(devices => {
                  return devices.map(
                    device =>
                      html`
                        <div>
                          ${device.kind}: ${device.label} id =
                          ${device.deviceId}
                        </div>
                      `,
                  );
                })
                .catch(function(err) {
                  return html`
                    ${err.name + ': ' + err.message}
                  `;
                })
            : `enumerateDevices() not supported.`}
        </div>
        <div class="split" id="two">
          <${audioVisualiser} stream=${stream} width="300" height="200" />
        </div>
        <div class="split" id="three">
          <${audioCapturer} stream=${stream} />
        </div>
      </div>
    `,
    document.querySelector('#app'),
  );
  const split = Split(
    [
      document.querySelector('#one'),
      document.querySelector('#two'),
      document.querySelector('#three'),
    ],
    {
      sizes: [50, 25, 50],
    },
  );
  window.split = split;
  //debugger;
})();
