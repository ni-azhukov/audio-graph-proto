/*
 * Component scheme
 *
 */

import { html, render } from "@modulor-js/html";
import BaseComponent from "../baseComponent";

customElements.define(
  "sine-wave",
  class SineWaveComponent extends BaseComponent {
    inputsCount = 0;
    outputsCount = 1;

    async setup() {
      // create Oscillator node
      this.oscillator = this.audioContext.createOscillator();

      this.oscillator.type = "sine";
      this.setFrequency(440);
      this.oscillator.connect(this.outputs[0]);
      this.oscillator.start();
    }

    setFrequency(value) {
      this.oscillator.frequency.setValueAtTime(
        value,
        this.audioContext.currentTime
      ); // value in hertz
    }

    render() {
      const freq = this.oscillator.frequency.value;
      return html`
        <div>
          freq: ${freq}
          <input
            type="range"
            min="0"
            max="500"
            step="1"
            value=${freq}
            onchange=${({ target: { value } }) => this.setFrequency(+value)}
          />
        </div>
      `;
    }
  }
);
