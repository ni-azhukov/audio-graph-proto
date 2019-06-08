/*
 * Component scheme
 *

┌──────────────┐
│┌───┐      ┌──┴───┐
││Mic├stream┤Output│
│└───┘      └──┬───┘
└──────────────┘

*/

import {html, render} from '@modulor-js/html';
import BaseComponent from '../baseComponent';


const types = {
  'audio': 'audioinput',
  'video': 'videoinput',
}

const getDevices = async (filterKind) => {
  return (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => !filterKind || kind === filterKind,
  );
};

customElements.define(
  'media-input-component',
  class MicrophoneInputComponent extends BaseComponent {

    inputsCount = 0;
    outputsCount = 1;

    data = {};

    async getDevices() {
      return getDevices(types[this.data.type]);
    }

    async changeDevice(deviceId) {
      this.inputStream && this.inputStream.disconnect(this.outputs[0]);

      this.deviceId = deviceId;
      const deviceStream = await navigator.mediaDevices.getUserMedia({
        audio: {deviceId: {exact: deviceId}},
      });
      this.inputStream = this.audioContext.createMediaStreamSource(
        deviceStream,
      );
      this.inputStream.connect(this.outputs[0]);
    }

    async setup() {
      this.devices = await this.getDevices();
      this.changeDevice(this.devices[0].deviceId);
      navigator.mediaDevices.addEventListener('devicechange', async () => {
        this.devices = await this.getDevices();
        this.renderComponent();
      });
    }

    render() {
      const formCheckboxName = `device-selector-${+new Date()}`;
      return html`
        <form style="text-align: left;">
          ${this.devices.map(
            ({deviceId, label}) =>
              html`
                <label style="display: block;">
                  <input
                    type="radio"
                    name=${formCheckboxName}
                    value=${deviceId}
                    checked=${deviceId === this.deviceId}
                    onchange=${({target: {value}}) => this.changeDevice(value)}
                  />
                  ${label || 'unknown'}
                </label>
              `,
          )}
        </form>
      `;
    }
  },
);
