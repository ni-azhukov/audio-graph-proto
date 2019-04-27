/*
 * Component scheme
 *
   ┌──────────────┐
┌──┴──┐        ┌──┴───┐
│Input├─stream─┤Output│
└──┬──┘        └──┬───┘
   └──────────────┘
*/



import {html, render} from '@modulor-js/html';
import './index.css';


export default class BaseComponent extends HTMLElement {

  inputsCount = 0;
  outputsCount = 0;

  inputs = [];
  $inputs = [];

  outputs = [];
  $outputs = [];

  connectIO = [];

  streams = [];

  $componentContainer = document.createElement('div');
  audioContext = void 0;

  async connectedCallback(){
    !this.audioContext && (this.audioContext = new AudioContext());

    if(!this.inputs.length){
      for(let i = 0; i < this.inputsCount; i++){
        this.inputs.push(this.audioContext.createMediaStreamDestination());
      }
    }

    if(!this.outputs.length){
      for(let i = 0; i < this.outputsCount; i++){
        this.outputs.push(this.audioContext.createMediaStreamDestination());
      }
    }

    if(!this.streams.length){
      for(let i = 0; i < this.connectIO.length; i++){
        const [inputIndex, outputIndex] = this.connectIO[i];
        const stream = this.audioContext.createMediaStreamSource(this.inputs[inputIndex].stream);
        stream.connect(this.outputs[outputIndex]);
        this.streams.push(stream);
      }
    }

    await this.setup();

    this.renderComponent();
    this.renderNode();
  }

  async setup(){
  }

  async teardown(){
  }

  registerInput($el){
    this.$inputs.push($el);
  }

  registerOutput($el){
    this.$outputs.push($el);
  }

  get props(){
    return this._props;
  }
  set props(value){
    this._props = value;
  }

  renderNode(){
    render(html`
      <div class="component-wrapper">
        <div class="component-inputs">
          ${this.inputs.map((input) => html`
            <span class="component-input" ${this.registerInput.bind(this)}>[->]</span>
          `)}
        </div>
        <div class="component-container">
          ${this.$componentContainer}
        </div>
        <div class="component-outputs">
          ${this.outputs.map((input) => html`
            <span class="component-output" ${this.registerOutput.bind(this)}>[->]</span>
          `)}
        </div>
      </div>
    `, this);
  }
  renderComponent(){
    render(this.render(this.props), this.$componentContainer);
  }
};
