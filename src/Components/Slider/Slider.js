import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import './Slider.css'
import { getSingleFiles } from '../../../src/data/api';
import leftArrow from "../icons/left-arrow.svg";
import rightArrow from "../icons/right-arrow.svg";
import { Context } from '../../pages/Practice/Practice';

const Slider = (transcript) => {

  const [slideIndex, setSlideIndex] = useState(1);
  const [singleFiles, setSingleFiles] = useState([]);
  const [transcriptTrue, setTranscriptTrue] = useState();
  const [transcriptWrong, setTranscriptWrong] = useState(false);
  const stop = useContext(Context)

  const speechText = transcript.transcript
  const resetTranscript = transcript.resetTranscript

  const answerFirst = singleFiles.map((file, index) => file.answerOne);
  const answerSecond = singleFiles.map((file, index) => file.answerTwo);

  let answerOne;
  if (stop) {
    answerOne = answerFirst.includes(speechText)
  }

  let answerTwo;
  if (stop) {
    answerTwo = answerSecond.includes(speechText)
  }

  useEffect(() => {
    getSingleFileslist();
  }, []);

  const getSingleFileslist = async () => {
    try {
      const fileslist = await getSingleFiles();
      setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleFileslist();
  }, []);

  useEffect(() => {
    if (answerOne || answerTwo) {
      setTranscriptTrue(true);
    } else if (answerOne === false || answerTwo === false) {
      setTranscriptWrong(true)
    }
  }, [stop]);

  const nextSlide = () => {
    resetTranscript()
    if (slideIndex !== singleFiles.length && transcriptTrue) {
      setSlideIndex(slideIndex + 1)

    }
    else if (slideIndex === singleFiles.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    resetTranscript()
    if (slideIndex !== 1) {
      setSlideIndex(singleFiles - 1)
    }
    else if (slideIndex === 1) {
      setSlideIndex(singleFiles.length)

    }
  }

  return (
    <Container>
      <Row className='emoji'>
        {transcriptTrue && stop ? <Col sm={1}>
          <BsEmojiSmile className='right-emoji' />
        </Col> : null}
      </Row>
      <Row className='emoji'>
        {transcriptWrong && stop ? <Col sm={1}>
          <BsEmojiFrown className='worng-emoji' />
        </Col> : null}
      </Row>
      <Row className="slider">
        {singleFiles.map((file, index) => {
          return (
            <div
              key={file._id}
              className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
            >
              <img src={`http://localhost:8080/${file.filePath}`} alt="img" />
            </div>
          )
        })}
        <button onClick={nextSlide} className="btn-slide next">
          <img src={rightArrow} alt="right" />
        </button>
        <button onClick={prevSlide} className="btn-slide prev">
          <img src={leftArrow} alt="left" />
        </button>
      </Row>
    </Container>
  )
}

export default Slider;
