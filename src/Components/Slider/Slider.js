import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import './Slider.css'
import BtnSlider from './BtnSlider'
import { getSingleFiles } from '../../../src/data/api';


export default function Slider(transcript) {

  const [slideIndex, setSlideIndex] = useState(1);
  const [singleFiles, setSingleFiles] = useState([]);

  const speechText = transcript.transcript
  const listening = transcript.listening

  // const answerOne = singleFiles.map((file, index) => file.answerOne);
  // // const answerTwo = singleFiles.map((file, index) => file.answerTwo);


  const answerOne = 'my name is Manikandan what is your name';
  // const answerTwo = 'my name is Manikandan whats your name';

  console.log("speechText", speechText)
  console.log("listening", listening)


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
    if (speechText === answerOne) {
      console.log("success");
    } else {
      console.log("fail")
    }
  }, [listening, speechText]);


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
