import {html, render} from '@modulor-js/html';
import Split from 'split.js';
import { Draggable } from '@shopify/draggable';

import './index.css';

import './components/microphoneInput';
import './components/audioVisualiser';
import './components/passThrough';
import './components/speaker-output';
import './components/volumeControl';
import './components/audioCapturer';
import './components/wire';


const data = {
  components: [
    {
      component: 'microphone-input-component',
      position: [10, 60],
      title: 'input',
    },
    {
      component: 'pass-through',
      position: [400, 100],
      title: 'pass through',
    },
    {
      component: 'input-visualiser-component',
      position: [600, 70],
      title: 'visualiser',
    },
    {
      component: 'volume-control',
      position: [800, 70],
      title: 'volume',
    },
    {
      component: 'audio-capturer',
      position: [1000, 70],
      title: 'recorder',
    },
    {
      component: 'speaker-output',
      position: [1200, 70],
      title: 'speaker',
    },
  ],
  connections: [
    [[0, 0], [1, 0]],
    [[1, 0], [2, 0]],
    [[2, 0], [3, 0]],
    [[3, 0], [4, 0]],
    [[4, 0], [5, 0]],
  ]
}

const componentsRegistry = new Map();
function registerComponent($component, index){
  componentsRegistry.set(index, $component);
}
window.componentsRegistry = componentsRegistry;

function connect([source, sourcePort], [target, targetPort]){
  const stream = target.audioContext.createMediaStreamSource(source.outputs[sourcePort].stream);
  stream.connect(target.inputs[targetPort]);
  return stream;
};

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

render(html`
  ${data.components.map(({ component, position, title }, index) => html`
    <${component} ${registerComponent}=${index} ${draggable} class="audio-component" style=${{
      position: 'absolute',
      left: `${position[0]}px`,
      top: `${position[1]}px`,
    }} title=${title}/>
  `)}
  ${data.connections.map(([[sourceIndex, sourcePort], [targetIndex, targetPort]]) => new Promise(resolve => {
    setTimeout(() => {
      const source = componentsRegistry.get(sourceIndex);
      const target = componentsRegistry.get(targetIndex);

      resolve(html`
        <wire-component source=${[source, sourcePort]} target=${[target, targetPort]}/>
      `)
    }, 1)
  }))}
`, document.querySelector('#app'));




