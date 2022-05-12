import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaStop } from 'react-icons/fa';
import { BsFillMicFill } from 'react-icons/bs';
import Slider from '../../Components/Slider/Slider';
import './Practice.css';
import PlaySound from '../../Components/PlaySound/PlaySound';

export const Context = React.createContext();

const Practice = () => {
  const [stop, setStop] = useState(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    stopListening
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    setStop(false)
    SpeechRecognition.startListening({ continuous: true })

  };

  const onStop = () => {
    setStop(true)
    SpeechRecognition.stopListening()
  }

  return (
    <Context.Provider value={stop}>
      <Container fluid>
        <Row>
          <Row>
            <Slider transcript={transcript} resetTranscript={resetTranscript} stopListening={stopListening} />
          </Row>
          <Row className='p-trans'>
            <p >{transcript}</p>
          </Row>
          <Row className='buttons'>
            <Col sm={2} className="icons">
              <div className='mic-animation '>
                <BsFillMicFill size="2em" color='#14424d' onClick={startListening} />
              </div>
            </Col>
            <Col sm={2} className="icons">
              <img src="asset/images/reset.png"
                alt="mic"
                className='reset-btn'
                onClick={resetTranscript} />
            </Col>
            <Col sm={2} className="icons">
              <div className='stop-btn'>
                <FaStop size="2em" color='red' onClick={onStop} />
              </div>
            </Col>
          </Row>
        </Row>
        <Row>
          <PlaySound />
        </Row>
      </Container>
    </Context.Provider>
  );
};
export default Practice;