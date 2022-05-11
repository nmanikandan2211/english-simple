import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import './Slider.css'
import BtnSlider from '../BtnSlider/BtnSlider'
import { getSingleFiles } from '../../../src/data/api';

const Slider = (transcript) => {

  const [slideIndex, setSlideIndex] = useState(1);
  const [singleFiles, setSingleFiles] = useState([]);
  const [transcriptTrue, setTranscriptTrue] = useState();
  const [transcriptWrong, setTranscriptWrong] = useState(false);
  const [click, setClick] = useState();

  const speechText = transcript.transcript
  const answerFirst = singleFiles.map((file, index) => file.answerOne);
  const answerSecond = singleFiles.map((file, index) => file.answerTwo);

  let answerOne;
  if (click) {
    answerOne = answerFirst.includes(speechText)
  }

  let answerTwo;
  if (click) {
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
  }, [click]);


  const nextSlide = () => {
    if (slideIndex !== singleFiles.length && transcriptTrue) {
      setSlideIndex(slideIndex + 1)

    }
    else if (slideIndex === singleFiles.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(singleFiles - 1)
    }
    else if (slideIndex === 1) {
      setSlideIndex(singleFiles.length)

    }
  }

  const clickMe = () => {
    setClick(true)
    console.log("clicked")
  }

  return (
    <Container>
      <Row className='emoji'>
        {transcriptTrue && click ? <Col sm={1}>
          <BsEmojiSmile className='right-emoji' />
        </Col> : null}
      </Row>
      <Row className='emoji'>
        {transcriptWrong && click ? <Col sm={1}>
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
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      </Row>
      <Row>
        <button onClick={clickMe}>click</button>
      </Row>
    </Container>

  )
}

export default Slider;
