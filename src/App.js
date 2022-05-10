import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaStop } from "react-icons/fa";
import { BsFillMicFill } from "react-icons/bs";
import "./index.css";
import Slider from './Components/Slider/Slider';

const App = () => {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  return (
    <Container fluid>
      <Row>
        <Row>
          <Slider transcript={transcript} />
        </Row>
        <Row className='p-trans'>
          <p >{transcript}</p>
        </Row>
        <Row className='buttons'>
          <Col sm={2} className="icons">
            <div className='mic-animation'>
              <BsFillMicFill size="2em" color='#14424d' onClick={startListening} />
            </div>
          </Col>
          <Col sm={2} className="icons">
            <img src="imgs/reset.png"
              alt="mic"
              className='reset-btn'
              onClick={resetTranscript} />
          </Col>
          <Col sm={2} className="icons">
            <div className='stop-btn'>
              <FaStop size="2em" color='red' onClick={SpeechRecognition.stopListening} />
            </div>
          </Col>
        </Row>
      </Row>
    </Container>

  );
};
export default App;