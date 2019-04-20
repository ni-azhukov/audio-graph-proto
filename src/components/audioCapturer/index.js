import {html, render} from '@modulor-js/html';

export default ({stream}) => {
  const mediaRecorder = new MediaRecorder(stream);
  return range => {

    const start = () => {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log('recorder started');
    };

    const stop = () => {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log('recorder stopped');
    };

    const $status = document.createElement('span');

    render(
      html`
        <button onclick=${start}>start</button>
        <button onclick=${stop}>stop</button>
        ${$status}
        ${range => {
          var chunks = [];
          mediaRecorder.addEventListener('start', e => {
            chunks = [];
            $status.textContent = 'recording';
          });
          mediaRecorder.addEventListener('dataavailable', e => {
            chunks.push(e.data);
          });
          mediaRecorder.addEventListener('stop', e => {
            $status.textContent = '';
            var blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
            var audioURL = window.URL.createObjectURL(blob);

            render(
              html`
                <article class="clip">
                  <audio controls="" src="${audioURL}"></audio>
                  <p>asd</p>
                  <button
                    onclick=${e => {
                      debugger;
                      var evtTgt = e.target;
                      evtTgt.parentNode.parentNode.removeChild(
                        evtTgt.parentNode,
                      );
                    }}
                  >
                    Delete
                  </button>
                </article>
              `,
              range,
            );

            console.log('recorder stopped');
            return;
          });
        }}
      `,
      range,
    );
  };
};
