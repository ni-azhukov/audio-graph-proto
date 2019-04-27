/*
 * Component scheme
 *
*/

import {html, render} from '@modulor-js/html';
import BaseComponent from '../baseComponent';


customElements.define('audio-capturer', class AudioCapturerComponent extends BaseComponent {

  inputsCount = 1;
  outputsCount = 1;

  connectIO = [[0, 0]];

  $status = document.createElement('span');

  async setup(){
    this.mediaRecorder = new MediaRecorder(this.streams[0].mediaStream);
  }

  start(){
    this.mediaRecorder.start();
    console.log('recorder started');
  }

  stop(){
    this.mediaRecorder.stop();
    console.log('recorder stopped');
  };

  render(){
    return html`
        <button onclick=${this.start.bind(this)}>start</button>
        <button onclick=${this.stop.bind(this)}>stop</button>
        ${this.$status}
        ${range => {
          var chunks = [];
          this.mediaRecorder.addEventListener('start', e => {
            chunks = [];
            this.$status.textContent = 'recording';
          });
          this.mediaRecorder.addEventListener('dataavailable', e => {
            chunks.push(e.data);
          });
          this.mediaRecorder.addEventListener('stop', e => {
            this.$status.textContent = '';
            var blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
            var audioURL = window.URL.createObjectURL(blob);

            render(
              html`
                <article class="clip">
                  <audio controls="" src="${audioURL}"></audio>
                  <button
                    onclick=${e => {
                      var evtTgt = e.target;
                      evtTgt.parentNode.parentNode.removeChild(
                        evtTgt.parentNode,
                      );
                    }}
                  >
                    Delete
                  </button>
                </article>
              `,
              range,
            );

            console.log('recorder stopped');
            return;
          });
        }}
    `;
  }
});
