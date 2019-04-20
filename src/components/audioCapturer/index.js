import {html, render} from '@modulor-js/html';

export default ({mediaRecorder}) => {
  return range => {
    var chunks = [];

    mediaRecorder.addEventListener('dataavailable', e => {
      console.log(5656, e.data);
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', e => {
      console.log('recorder stopped');

      var clipName = prompt('Enter a name for your sound clip');

      var clipContainer = document.createElement('article');
      var clipLabel = document.createElement('p');
      var audio = document.createElement('audio');
      var deleteButton = document.createElement('button');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.innerHTML = 'Delete';
      clipLabel.innerHTML = clipName;

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);

      var blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;

      render(clipContainer, range);
      deleteButton.onclick = function(e) {
        var evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      };
    });
  };
};
