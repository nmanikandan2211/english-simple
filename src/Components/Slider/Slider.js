import React, { useState, useEffect } from 'react';
import './Slider.css'
import BtnSlider from './BtnSlider'
import { getSingleFiles } from '../../../src/data/api';


export default function Slider() {

  const [slideIndex, setSlideIndex] = useState(1)
  const [singleFiles, setSingleFiles] = useState([]);

  console.log("singleFiles", singleFiles)

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

  console.log("singleFiles", singleFiles)

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
    <div className="container-slider">
      <div className='tamil-image'>
        {singleFiles.map((file, index) => {
          return (
            <div
              key={file._id}
              className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
            >
              <img src={`http://localhost:8080/${file.filePath}`} alt="img" />
              <h2 >{file.text}</h2>

            </div>
          )
        })}
      </div>
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
    </div>
  )
}
