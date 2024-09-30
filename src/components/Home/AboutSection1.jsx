import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GhsSlider from './GhsSlider';
import GhsSlider2 from './GhsSlider2';

const Container = styled.section`
     background-color: var(--whiteColor); 
  background-image: radial-gradient(circle, var(--blue4) 1px, transparent 1px);
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
            <li onClick={() => updateToggle(1)} className={toggle === 1 ? 'lineUnder' : ''}>Mission</li>
            <li onClick={() => updateToggle(2)} className={toggle === 2 ? 'lineUnder' : ''}>Vision</li>
          </ul>
        </Tabs>
        {toggle === 1 && (
          <ShowMission variants={containerVariants} initial="hidden" animate="visible">
            <motion.h3 variants={childVariants}>Our Mission</motion.h3>
            <p>
            Our mission is to provide comprehensive support, education, and resources to men affected by breast cancer, addressing their unique needs and challenges. We aim to raise awareness about male breast cancer, a condition often overlooked and misunderstood, to ensure early detection and timely intervention. By promoting awareness, we seek to dismantle the stigma and misconceptions surrounding male breast cancer, encouraging men to seek medical advice and support without hesitation.
            We are committed to improving patient outcomes through advocacy, cutting-edge research, and collaboration with healthcare professionals. Our goal is to empower men with the knowledge and resources needed to make informed decisions about their health and treatment options. We strive to build a strong, supportive community where men and their families can find strength, encouragement, and hope throughout their journey. By providing emotional, practical, and educational support, we aim to improve the quality of life for men affected by breast cancer and their loved ones.

            </p>
          </ShowMission>
        )}

        {toggle === 2 && (
          <ShowMission variants={containerVariants} initial="hidden" animate="visible">
            <motion.h3 variants={childVariants}>Our Vision</motion.h3>
            <p>
            Our vision is a world where male breast cancer is universally recognized, effectively treated, and no longer shrouded in stigma. We envision a future where every man, regardless of background or circumstances, has access to the highest standard of care and support for breast cancer. We aspire to create a healthcare environment that prioritizes early detection, accurate diagnosis, and innovative treatment options tailored to the specific needs of men.
            We aim to be at the forefront of research and advocacy, working tirelessly to reduce the incidence and impact of male breast cancer on a global scale. Through continuous education and awareness campaigns, we hope to shift public perception and ensure that male breast cancer is understood as a critical health issue. We believe in fostering a compassionate, informed society where men feel empowered to take proactive steps toward their health and well-being.
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