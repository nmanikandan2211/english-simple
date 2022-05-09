import React from 'react';
import { Container, Row } from 'react-bootstrap';
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
    <Container fluid>
      <Row className='slider-component'>
        <Slider transcript={transcript} listening={listening} />
      </Row>
      <Row className='p-trans'>
        <p >{transcript}</p>
      </Row>
      <Row className='buttons'>
        <div className='mic-animation'>
          <img src="imgs/voice.png" width="100 %"
            // {/* // className={SpeechRecognition.startListening ? 'on-mic' : 'off-mic'} */}
            onClick={SpeechRecognition.startListening} />
        </div>
        <div>
          <img src="imgs/reset.png"
            alt="mic"
            className='reset-btn'
            onClick={resetTranscript} />
        </div>
      </Row>
    </Container>

  );
};
export default App;