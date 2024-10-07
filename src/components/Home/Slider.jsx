import { useState, useEffect } from 'react'; // Import useState and useEffect hooks from React
import styled from 'styled-components'; // Import styled-components for styling

// Import images

// Array of imported images
const IMAGES = [
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259609/GHS/IMG_2153_optimized_uxi4zj.jpg",
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259607/GHS/IMG_2179_optimized_rvuogf.jpg",
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259606/GHS/IMG_2172_optimized_ryeaka.jpg",
  "https://res.cloudinary.com/dvh9j4utq/image/upload/v1728259606/GHS/IMG_2164_optimized_vskuni.jpg"
];
const CAPTIONS = [
    {
        topic: "GHS APARTMENTS",
        message: "Welcome to your home away from home. Enjoy luxury living at our shortlet apartments."
    },
    {
        topic: "Where Relaxation Meets Convenience",
        message: "Discover the perfect blend of comfort and convenience during your stay."
    },
    {
        topic: "Unwind in Sophisticated Style",
        message: "Whether you're here for business or leisure, we’ve got you covered."
    },
    {
        topic: "Experience Premium Living",
        message: "Relax in the comfort of our fully furnished shortlet apartments, designed to meet your every need."
    }
];





// Styled component for the slider container
const SliderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 1; /* Lower z-index */
`;

const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0); // Semi-transparent dark background
  z-index: 2; // Make sure the overlay is above the images
`;

// Styled component for each slider item
const SliderItem = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  overflow: hidden;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: 0.5s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #874bb8;
    opacity: 0.2;
  }
`;

// Styled component for the content within each slider item
const Content = styled.div`
  position: absolute;
  color: #fff;
  left: 10%;
  top: 40%;
  width: 500px;
  max-width: 80%;
  z-index: 3;
  


  h2 {
    text-transform: uppercase;
    font-size: 40px;
    margin: 0;
    color: var(--white);
    text-shadow:rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  p{
    font-size: 20px;
  }
`;

// Styled component for the arrows
const Arrows = styled.div`
  position: absolute;
  top: 40%;
  right: 50px;
  z-index: 100;

  button {
    background-color: #eee5;
    border: none;
    font-family: monospace;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    font-size: x-large;
    color: #eee;
    transition: 0.5s;

    &:hover {
      background-color: #eee;
      color: black;
    }
  }
`;

// Styled component for the thumbnails
const Thumbnail = styled.div`
  position: absolute;
  bottom: 20px;
  z-index: 11;
  display: flex;
  gap: 10px;
  width: 100%;
  height: 250px;
  padding: 0 50px;
  box-sizing: border-box;
  overflow: auto;
  justify-content: center;
  align-items: center;


  &::-webkit-scrollbar {
    width: 0;
  }

  &:hover{
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 180px;  
    bottom: 5px;
  }

  @media (max-width: 480px) {
    height: 150px;  
  }
`;

// Styled component for each thumbnail item
const ThumbnailItem = styled.div`
  width: 150px;
  height: 90%;
  filter: brightness(${(props) => (props.active ? 1.5 : 0.5)});
  transition: 0.5s;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    width: 120px;  /* Reduce the width on tablets */
  }

  @media (max-width: 480px) {
    width: 100px;  /* Further reduce width on phones */
  }
`;

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to keep track of the active index

  // useEffect to set up an interval for auto-sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to manually set the active slider item
  const showSlider = (index) => {
    setActiveIndex(index);
  };

  return (
    <SliderContainer>
      <DarkOverlay />
      {/* Loop through the IMAGES array and create a SliderItem for each image */}
      {IMAGES.map((image, index) => (
        <SliderItem key={index} active={index === activeIndex}>
          {/* Display the image */}
          <img src={image} alt={`Slider ${index + 1}`} />
          {/* Display the content (captions) for the active slider item */}
          <Content active={index === activeIndex}>
            <h2>{CAPTIONS[index].topic}</h2>
            <p>{CAPTIONS[index].message}</p>
          </Content>
        </SliderItem>
      ))}
      {/* Arrows for navigating the slider */}
      <Arrows>
        {/* Button to show the previous slider item */}
        <button onClick={() => showSlider((activeIndex - 1 + IMAGES.length) % IMAGES.length)}>{'<'}</button>
        {/* Button to show the next slider item */}
        <button onClick={() => showSlider((activeIndex + 1) % IMAGES.length)}>{'>'}</button>
      </Arrows>
      {/* Thumbnails for each slider item */}
      <Thumbnail>
        {IMAGES.map((image, index) => (
          <ThumbnailItem key={index} active={index === activeIndex} onClick={() => showSlider(index)}>
            {/* Display the thumbnail image */}
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </ThumbnailItem>
        ))}
      </Thumbnail>
    </SliderContainer>
  );
};

export default Slider;