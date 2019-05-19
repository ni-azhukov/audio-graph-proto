import {html, render} from '@modulor-js/html';
import Split from 'split.js';

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
    },
    {
      component: 'pass-through',
      position: [400, 100],
    },
    {
      component: 'input-visualiser-component',
      position: [600, 70],
    },
    {
      component: 'volume-control',
      position: [800, 70],
    },
    {
      component: 'audio-capturer',
      position: [1000, 70],
    },
    {
      component: 'speaker-output',
      position: [1200, 70],
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

render(html`
  ${data.components.map(({ component, position }, index) => html`
    <${component} ${registerComponent}=${index} class="audio-component" style=${{
      position: 'absolute',
      left: `${position[0]}px`,
      top: `${position[1]}px`,
    }} />
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
`, document.querySelector('#app'))



