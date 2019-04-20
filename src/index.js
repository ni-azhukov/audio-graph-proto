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

  render(
    html`
      <div>
        <${audioVisualiser} stream=${stream} />
      </div>
      <div>
        <${audioCapturer} stream=${stream} />
      </div>
      <div>
        ${(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
          ? navigator.mediaDevices.enumerateDevices()
            .then(devices => {
              return devices.map(
                device =>
                  html`
                    <div>
                      ${device.kind}: ${device.label} id = ${device.deviceId}
                    </div>
                  `,
              );
            })
            .catch(function(err) {
              return html`
                ${err.name + ': ' + err.message}
              `
            })
          : `enumerateDevices() not supported.`
        }
      </div>
    `,
    document.querySelector('#app'),
  );
})();
