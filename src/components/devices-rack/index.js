/*
 * Component scheme
 *
*/



import {html, render} from '@modulor-js/html';
import BaseComponent from '../baseComponent';

import './index.css';


function draggable($el){
  $el.draggable = true;
  function dr(e){
    //$el.style.left = `${e.clientX}px`;
    console.log(`
      ${e.clientX}, ${e.layerX}, ${e.offsetX}, ${e.pageX}, ${e.screenX}, ${e.x}
    `);
  }
  function stopDr(){
    document.removeEventListener('mousemove', dr);
    document.removeEventListener('mouseup', stopDr);
  }
  $el.ondragstart = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', dr);
    document.addEventListener('mouseup', stopDr);
  }
};

customElements.define('devices-rack', class DevicesRackComponent extends BaseComponent {

  inputsCount = 0;
  outputsCount = 1;

  connectIO = [];

  data = {};
  componentsRegistry = new Map();

  registerComponent($component, index){
    this.componentsRegistry.set(index, $component);
  }

  async setup() {
  }

  render({ data }){
    return html`
      ${data.components.map(({ component, position, title, ...data }, index) => html`
        <${component} ${this.registerComponent.bind(this)}=${index} ${draggable} class="audio-component" style=${{
          position: 'absolute',
          left: `${position[0]}px`,
          top: `${position[1]}px`,
        }} title=${title} ${Object.keys(data).length ? 'data' : null}=${data}/>
      `)}
      ${data.connections.map(([[sourceIndex, sourcePort], [targetIndex, targetPort]]) => new Promise(resolve => {
        setTimeout(() => {
          const source = this.componentsRegistry.get(sourceIndex);
          const target = this.componentsRegistry.get(targetIndex);

          resolve(html`
            <wire-component source=${[source, sourcePort]} target=${[target, targetPort]}/>
          `)
        }, 1)
      }))}
    `;
  }
});
