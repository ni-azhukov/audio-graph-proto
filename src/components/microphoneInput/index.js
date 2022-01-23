/*
 * Component scheme
 *

┌──────────────┐
│┌───┐      ┌──┴───┐
││Mic├stream┤Output│
│└───┘      └──┬───┘
└──────────────┘

*/

import { html, render } from "@modulor-js/html";
import BaseComponent from "../baseComponent";

const getAudioDevices = async () => {
  await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  return (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === "audioinput"
  );
};

customElements.define(
  "microphone-input-component",
  class MicrophoneInputComponent extends BaseComponent {
    inputsCount = 0;
    outputsCount = 1;

    async changeDevice(deviceId) {
      this.inputStream && this.inputStream.disconnect(this.outputs[0]);

      this.deviceId = deviceId;
      const deviceStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
      });
      this.inputStream =
        this.audioContext.createMediaStreamSource(deviceStream);
      this.inputStream.connect(this.outputs[0]);
    }

    async setup() {
      this.devices = await getAudioDevices();
      this.changeDevice(this.devices[1].deviceId);
      navigator.mediaDevices.addEventListener("devicechange", async () => {
        this.devices = await getAudioDevices();
        this.renderComponent();
      });
    }

    render() {
      const formCheckboxName = `device-selector-${+new Date()}`;
      return html`
        <form style="text-align: left;">
          ${this.devices.map(
            ({ deviceId, label }) =>
              html`
                <label style="display: block;">
                  <input
                    type="radio"
                    name=${formCheckboxName}
                    value=${deviceId}
                    checked=${deviceId === this.deviceId}
                    onchange=${({ target: { value } }) =>
                      this.changeDevice(value)}
                  />
                  ${label || "unknown"}
                </label>
              `
          )}
        </form>
      `;
    }
  }
);
