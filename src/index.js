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
    },
    {
      component: 'pass-through',
    },
    {
      component: 'input-visualiser-component',
    },
    {
      component: 'volume-control',
    },
    {
      component: 'audio-capturer',
    },
    {
      component: 'speaker-output',
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
  ${data.components.map(({ component }, index) => html`
    <${component} ${registerComponent}=${index} class="audio-component" />
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

