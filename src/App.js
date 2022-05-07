import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./index.css";
import Slider from './Components/Slider/Slider';


const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div>
        <Slider />
      </div>
      <div className='main'>
        <p className='p-mic'>Microphone: {listening ? 'on' : 'off'}</p>
        <p className='p-trans'>{transcript}</p>
        <div className='buttons'>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
      </div>
    </div>
  );
};
export default App;