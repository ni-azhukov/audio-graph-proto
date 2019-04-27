/*
 * Component scheme
 *
   ┌──────────────┐
┌──┴──┐        ┌──┴───┐
│Input├─stream─┤Output│
└──┬──┘        └──┬───┘
   └──────────────┘
*/



import {html, render} from '@modulor-js/html';
import BaseComponent from '../baseComponent';


customElements.define('pass-through', class PassThroughComponent extends BaseComponent {

  inputsCount = 1;
  outputsCount = 1;

  connectIO = [[0, 0]];

  async setup() {
  }

  render(){
    return html`
      ->P->
    `;
  }
});
