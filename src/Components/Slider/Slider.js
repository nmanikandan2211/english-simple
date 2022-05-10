import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import './Slider.css'
import BtnSlider from './BtnSlider'
import { getSingleFiles } from '../../../src/data/api';


const Slider = (transcript) => {

  const [slideIndex, setSlideIndex] = useState(1);
  const [singleFiles, setSingleFiles] = useState([]);
  const [transcriptTrue, setTranncriptTrue] = useState();

  const speechText = transcript.transcript

  const answer = singleFiles.map((file, index) => file.answerOne);
  const answerOne = answer.includes(speechText)

  console.log("answerOne", answerOne)

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
    if (answerOne) {
      setTranncriptTrue(true);
    }
  }, [answerOne]);

  useEffect(() => {
    if (answerOne) {
      setTranncriptTrue(false);
    }
  }, [answerOne]);


  const nextSlide = () => {
    if (slideIndex !== singleFiles.length) {
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

  return (
    <Container>
      <Row className='emoji'>
        {transcriptTrue ? <Col sm={1}>
          <BsEmojiSmile className='right-emoji' />
        </Col> : null}
      </Row>
      <Row className='emoji'>
        {!transcriptTrue ? <Col sm={1}>
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
    </Container>

  )
}

export default Slider;
