const data = {
  description: 'line processor',
  id: 'someid',
  inputs: [
    //...
  ],
  outputs: [
    //...
  ],
  modules: [
    {
      id: 'ainp',
      component: 'audio-input',
      value: 'default',
      outputs: [
        ['avis', 0]
      ]
    },
    {
      id: 'avis',
      component: 'audio-visualiser',
      outputs: [
        ['arec', 0]
      ]
    },
    {
      id: 'arec',
      component: 'audio-recorder',
      outputs: [
        //...
      ]
    },
  ]
}

const data2 = {
  description: 'more complex',
  id: 'someid',
  inputs: [
    //...
  ],
  outputs: [
    //...
  ],
  modules: [
    {
      id: 'ainp0',
      component: 'audio-input',
      value: 'default',
      outputs: [
        ['amix', 0]
      ]
    },
    {
      id: 'ainp1',
      value: 'usb-mic',
      component: 'audio-input',
      outputs: [
        ['amix', 1]
      ]
    },
    {
      id: 'amix',
      component: 'audio-mixer',
      outputs: [
        ['avis', 0]
      ]
    },
    {
      id: 'avis',
      component: 'audio-visualiser',
      outputs: [
        ['arec', 0]
      ]
    },
    {
      id: 'arec',
      component: 'audio-recorder',
      outputs: [
        //...
      ]
    },
  ]
}

// outputs:  [ moduleIndex, socketIndex ]
const data3 = {
  description: 'line processor',
  id: 'someid',
  inputs: [
    //...
  ],
  outputs: [
    //...
  ],
  modules: [
    {
      id: 'ainp',
      component: 'audio-input',
      value: 'default',
      outputs: [
        [1, 0]
      ]
    },
    {
      id: 'avis',
      component: 'audio-visualiser',
      outputs: [
        [2, 0]
      ]
    },
    {
      id: 'arec',
      component: 'audio-recorder',
      outputs: [
        //...
      ]
    },
  ]
}


class AudioComponent {
  get socketsCount(){ return 1 }

  connectStream(stream, socketIndex = 0){
  }

  setInput(stream, index){ //[stream, index]
  }

  getOutput(index){
  }

  getOutputs(){
    return [Promise/*, Promise, ...*/]
  }
}
