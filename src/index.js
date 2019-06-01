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
import './components/devices-rack';


const data = {
  components: [
    {
      component: 'microphone-input-component',
      position: [10, 10],
      title: 'input',
    },
    {
      component: 'pass-through',
      position: [400, 50],
      title: 'pass through',
    },
    {
      component: 'input-visualiser-component',
      position: [600, 20],
      title: 'visualiser',
    },
    {
      component: 'volume-control',
      position: [800, 20],
      title: 'volume',
    },
    {
      component: 'audio-capturer',
      position: [1000, 20],
      title: 'recorder',
    },
    {
      component: 'speaker-output',
      position: [1200, 30],
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



render(html`
  <devices-rack data=${data} />
`, document.querySelector('#app'));




