import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./index.css";
import './App.css';
import Slider from './Components/Slider/Slider'

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
    <div className='main'>
      <div>
      </div>
      <p className='p-mic'>Microphone: {listening ? 'on' : 'off'}</p>
      <div>
        <img src={process.env.PUBLIC_URL + `/images/1.jpg`} />
      </div>
      <p className='p-trans'>{transcript}</p>
      <div className='buttons'>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
    </div>
  );
};
export default App;