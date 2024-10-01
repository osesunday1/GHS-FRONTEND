import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GhsSlider from './GhsSlider';
import GhsSlider2 from './GhsSlider2';

const Container = styled.section`
     background-color: var(--whiteColor); 
  background-size: 70px 70px;
    width: 100vw;
    padding: 60px 0;


    @media (max-width: 768px) {
      padding: 0px 0;
      height: 100%;
  }
`

const Section2Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 1000px;
  max-width: 1200px;
  margin: auto;
  justify-content: center;
  

  @media (max-width: 768px) {
    display: block;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 0px;
    height: 1100px;
    overflow-x: hidden;
  }
`;

const SideImg = styled.div`
  position: relative;
`;


const SideImg2 = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center; /* Centers the image vertically */
  justify-content: center;
  
  img {
    display: block;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }

  @media (max-width: 768px) {
    display: block;
    width: 90%;
    left: 5%
  }
`;

const Overview = styled.div`
  gap: 0;
`;

const ShowMission = styled(motion.div)`
  display: block;
  padding: 0 30px;
  text-align: justify;
  margin-top: 0%;
`;

const Tabs = styled.div`
  margin-bottom: 0px;
  
  ul {
    font-size: 26px;
    display: flex;
    list-style: none;
    padding: 10px;
    align-items: center;
    justify-content: center;
    gap: 10px;

    li {
      text-decoration: none;
      color: var(--greyColor2);
      height: 100%;
      transition: ease-in 0.1s;

      &:hover {
        cursor: pointer;
        color: var(--greyColor);
      }

      &.lineUnder {
        border-bottom: 1px solid var(--blackColor);
        color: var(--blackColor) !important;
        transition: ease-in 0.1s;
      }
    }
  }
`;

const AboutSection1 = () => {
  const [toggle, setToggle] = useState(1);

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: '-20px',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        type: 'spring',
        mass: 0.4,
        damping: 8,
        when: 'beforeChildren',
        staggerChildren: 0.4,
      },
    },
  };

  const childVariants = {
    hidden: {
      color: 'var(--greyColor2)',
    },
    visible: {
      color: '#111111',
    },
  };



  

  const updateToggle = (id) => {
    setToggle(id);
  };

  return (
    <Container>
    <Section2Container>
      <Overview>
        <Tabs>
          <ul>
            <li onClick={() => updateToggle(1)} className={toggle === 1 ? 'lineUnder' : ''}>IVORY PEARL</li>
            <li onClick={() => updateToggle(2)} className={toggle === 2 ? 'lineUnder' : ''}>COZY SUITE</li>
          </ul>
        </Tabs>

        {toggle === 1 && (
          
          <ShowMission variants={containerVariants} initial="hidden" animate="visible">
            <motion.h3 variants={childVariants}> Ivory Pearl</motion.h3>
            <p>
            Step into a world of sophistication at Ivory Pearl, where elegance meets comfort. This luxurious apartment is designed for guests who appreciate the finer things in life. With classic décor and modern amenities, you’ll feel both relaxed and inspired in this serene environment. Enjoy 24-hour electricity, unwind with a game on the PlayStation 5, and let our daily housekeeping keep everything pristine. Whether you’re here for business or leisure, our on-site restaurant is ready to serve you with delectable dishes to complete your stay. Ivory Pearl is your perfect getaway for timeless luxury.

            </p>
          </ShowMission>

        )}

        {toggle === 2 && (
          <ShowMission variants={containerVariants} initial="hidden" animate="visible">
            <motion.h3 variants={childVariants}>Cozy Suite</motion.h3>
            <p>
            Experience the warmth and comfort of Cozy Suites, your personal retreat designed for relaxation. With its inviting ambiance and cozy interior, this apartment feels like a home away from home. Offering 24-hour electricity, a PlayStation 5 for entertainment, daily housekeeping, and a restaurant to cater to your dining needs, you’ll have everything you need for a perfect stay. Whether you’re here for a quick getaway or a longer stay, Cozy Suites provides the ultimate in comfort and convenience, wrapped in a warm, homey atmosphere.
            </p>
          </ShowMission>
        )}
      </Overview>

      <SideImg>
        
        <SideImg2>
          {toggle === 1 && (<GhsSlider/>)}
          {toggle === 2 && (<GhsSlider2/>)}
        </SideImg2>
      </SideImg>
    </Section2Container>
    </Container>
  );
};

export default AboutSection1;