/*
 * Component scheme
 *
*/

import {html, render} from '@modulor-js/html';

function connect([source, sourcePort], [target, targetPort]){
  const stream = target.audioContext.createMediaStreamSource(source.outputs[sourcePort].stream);
  stream.connect(target.inputs[targetPort]);
  //console.log(source.$outputs, target.$inputs);
  return stream;
};


customElements.define('wire-component', class WireComponent extends HTMLElement {

  source = void 0;
  target = void 0;

  async connectedCallback(){
    const { source, target } = this.props;
    this.stream = connect(source, target);
  }
  disconnectedCallback(){
    this.stream.disconnect();
  }
  set props(value){
    this._props = value;
    render(this.render(value), this);
  }
  get props(){
    return this._props;
  }

  render({ source: [source, sourcePort], target: [target, targetPort] }){
    return html`
      <div>${source.tagName}[${sourcePort}] -> ${target.tagName}[${targetPort}]</div>
      -wire-
    `;
  }
});
