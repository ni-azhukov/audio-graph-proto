/*
 * Component scheme
 *
   ┌───────────────┐
┌──┴──┐   ┌───────┐│
│Input├───┤Speaker││
└──┬──┘   └───────┘│
   └───────────────┘
*/



import {html, render} from '@modulor-js/html';
import BaseComponent from '../baseComponent';


customElements.define('speaker-output', class SpeakerOutputComponent extends BaseComponent {

  inputsCount = 1;

  async setup(){
    const inStream = this.audioContext.createMediaStreamSource(this.inputs[0].stream);
    inStream.connect(this.audioContext.destination);
  }
  render(){
    return html`
      ->S
    `;
  }
});
