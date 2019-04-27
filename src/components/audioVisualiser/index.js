/*
 * Component scheme
 *
┌────────────────┐
│                │
▶────stream──────▶
│       │        │
└───────┼────────┘
  ┌─────┴──────┐
  │AnalyserNode│
  └─────┬──────┘
        │
    ┌───┴────┐
    │Waveform│
    └────────┘
*/


import {html, render} from '@modulor-js/html';
import BaseComponent from '../baseComponent';

customElements.define('input-visualiser-component', class InputViasualiserComponent extends BaseComponent {

  inputsCount = 1;
  outputsCount = 1;

  connectIO = [[0, 0]];

  async setup(){
    this.analyser = this.audioContext.createAnalyser();
    this.streams[0].connect(this.analyser);
  }

  render(){
    const analyser = this.analyser;
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    function draw(canvas) {
      requestAnimationFrame(() => {
        draw(canvas);
      });

      const canvasCtx = canvas.getContext('2d');

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = (canvas.width * 1.0) / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    }

    return html`
      <canvas style=${`
        width: 5em;
        height: 5em;
      `} ${draw}>
      </canvas>
    `;
  }
});

