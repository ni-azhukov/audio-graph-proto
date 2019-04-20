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

  const devices = await navigator.mediaDevices.enumerateDevices();

  var aCtx = new AudioContext();
  let inputStream;
  const draw = async (deviceId = 'default') => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {deviceId: {exact: deviceId}},
    });

    if(inputStream){
      inputStream.disconnect(aCtx.destination);
    }

    inputStream = aCtx.createMediaStreamSource(stream);
    //inputStream.connect(aCtx.destination);

    window.stream = stream;
    render(
      html`
        <audio />
        <div class="flex">
          <div class="split" id="one">
            <select
              onchange=${({target: {value}}) => {
                draw(value);
              }}
            >
              ${devices
                .filter(({kind}) => kind === 'audioinput')
                .map(
                  device =>
                    html`
                      <option value=${device.deviceId}>
                        ${device.kind}: ${device.label} id = ${device.deviceId}
                      </option>
                    `,
                )}
            </select>
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
  };

  draw(devices[0].deviceId);
  //debugger;
})();
