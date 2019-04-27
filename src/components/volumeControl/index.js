/*
 * Component scheme
 *
*/



import {html, render} from '@modulor-js/html';
import BaseComponent from '../baseComponent';


customElements.define('volume-control', class PassThroughComponent extends BaseComponent {

  inputsCount = 1;
  outputsCount = 1;

  connectIO = [[0, 0]];

  async setup(){
    this.gainNode = this.audioContext.createGain();
    this.streams[0].connect(this.gainNode);
    this.gainNode.connect(this.outputs[0]);

    this.gainNode.gain.value = -1;
  }

  setVolume(value){
    this.gainNode.gain.value = +value;
  }

  render(){
    return html`
      <input type="range" min="-1" max="1" step="0.01" value=${this.gainNode.gain.value} onchange=${({ target: { value } }) => this.setVolume(+value)} />
    `;
  }
});
