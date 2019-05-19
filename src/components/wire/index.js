/*
 * Component scheme
 *
*/

import {html, render} from '@modulor-js/html';


function findAbsolutePosition(htmlElement) {
  var x = htmlElement.offsetLeft;
  var y = htmlElement.offsetTop;
  for (var x = 0, y = 0, el = htmlElement; el != null; el = el.offsetParent) {
     x += el.offsetLeft;
     y += el.offsetTop;
  }
  return {
    "x": x,
    "y": y
  };
};

function getPolyline(x1, y1, x2, y2, tension) {
  const delta = (x2 - x1) * tension;
  const hx1 = x1 + delta;
  const hy1 = y1;
  const hx2 = x2 - delta;
  const hy2 = y2;
  const path = `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${x2} ${y2}`;

  return path;
}

function connect([source, sourcePort], [target, targetPort]){
  const stream = target.audioContext.createMediaStreamSource(source.outputs[sourcePort].stream);
  stream.connect(target.inputs[targetPort]);
  return stream;
};


customElements.define('wire-component', class WireComponent extends HTMLElement {

  source = void 0;
  target = void 0;

  tension = 0.4;
  color = 'red';

  async connectedCallback(){
    const { source, target } = this.props;
    this.stream = connect(source, target);
  }
  disconnectedCallback(){
    this.stream.disconnect();
  }

  set props(value){
    this._props = value;
    setTimeout(() => render(this.render(value), this), 100);
  }
  get props(){
    return this._props;
  }

  render({ source: [source, sourcePort], target: [target, targetPort] }){

    const [left, right] = [source.$outputs[sourcePort], target.$inputs[targetPort]];

    if(!left || !right){
      return null;
    }

    const leftPos = findAbsolutePosition(left);
    let x1 = leftPos.x;
    let y1 = leftPos.y;
    x1 += left.offsetWidth;
    y1 += (left.offsetHeight / 2);

    const rightPos = findAbsolutePosition(right);
    let x2 = rightPos.x;
    let y2 = rightPos.y;
    y2 += (right.offsetHeight / 2);

    return html`
      <svg style="position: absolute;left: 0;top: 0; height: 100%; width: 100%;">
        <path d=${getPolyline(x1, y1, x2, y2, this.tension)} stroke="${this.color}" fill="none" />
      </svg>
    `;
  }
});
