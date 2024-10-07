import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';



// Styled component for the Slider container
const SliderContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 400px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
`;

// Styled component for each slide
const Slide = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

// Arrow button styles
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  z-index: 10;
  cursor: pointer;
  ${(props) => (props.direction === 'left' ? 'left: 10px;' : 'right: 10px;')}

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;


const images = [
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259609/GHS/IMG_2153_optimized_uxi4zj.jpg",
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259607/GHS/IMG_2179_optimized_rvuogf.jpg",
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259606/GHS/IMG_2172_optimized_ryeaka.jpg",
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259606/GHS/IMG_2164_optimized_vskuni.jpg"
];

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const GhsSlider2 = () => {
  const [index, setIndex] = useState(0);

  // Change slide every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <SliderContainer>
      <ArrowButton direction="left" onClick={handlePrev}>
        &#10094; {/* Left arrow symbol */}
      </ArrowButton>
      <ArrowButton direction="right" onClick={handleNext}>
        &#10095; {/* Right arrow symbol */}
      </ArrowButton>

      <AnimatePresence initial={false}>
        <Slide
          key={index}
          src={images[index]}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>
    </SliderContainer>
  );
};

export default GhsSlider2;