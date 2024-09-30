import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import car1 from '../../../public/a.png';
import car2 from '../../../public/ab.png';
import car3 from '../../../public/ac.png';
import car4 from '../../../public/ad.png';

const images = [car1, car2, car3, car4];

const runningTime = 3000;
const timeAutoNext = 7000;

const Carousel = () => {
  const [items, setItems] = useState(images);
  const [running, setRunning] = useState(false);

  const nextSlide = () => {
    setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
  };

  const prevSlide = () => {
    setItems((prevItems) => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
  };

  useEffect(() => {
    let autoNext = setTimeout(() => {
      nextSlide();
    }, timeAutoNext);

    return () => clearTimeout(autoNext);
  }, [items]);

  const resetTimeAnimation = () => {
    setRunning(false);
    setTimeout(() => {
      setRunning(true);
    }, 0);
  };

  return (
    <CarouselContainer>
      <CarouselWrapper className={running ? 'running' : ''}>
        <CarouselList>
          {items.map((image, index) => (
            <Item key={index} style={{ backgroundImage: `url(${image})` }} />
          ))}
        </CarouselList>
        <Arrows>
          <button onClick={prevSlide}>{'<'}</button>
          <button onClick={nextSlide}>{'>'}</button>
        </Arrows>
        <TimeRunning className={running ? 'running' : ''} />
      </CarouselWrapper>
    </CarouselContainer>
  );
};

// Styled Components

const CarouselContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: transform 1s;
`;

const Item = styled.div`
  width: 180px;
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  margin: 0 15px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const Arrows = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: space-between;
  width: 300px;

  button {
    width: 50px;
    height: 50px;
    background-color: #14ff72cb;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

const runningAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const TimeRunning = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background-color: #14ff72cb;
  animation: ${runningAnimation} ${timeAutoNext}ms linear infinite;
`;

export default Carousel;