import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GhsSlider from './GhsSlider';
import GhsSlider2 from './GhsSlider2';
import Modal from './../../styles/Modal';

const Container = styled.section`
  background-color: var(--whiteColor); 
  background-size: 70px 70px;
  width: 100vw;
  padding: 60px 0;

  @media (max-width: 768px) {
    padding: 0px 0;
    height: 100%;
    margin-top: 5%;
  }
`;

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
    gap: 0px;
    height: 200%;
    overflow-x: hidden;
    margin-bottom: 20px;
  }
`;

const StyledList = styled.ul`
  list-style-type: disc;
  padding-left: 20px; /* Add some padding to indent the bullets */
  margin-bottom: 20px; /* Space between the list and other content */

  li {
    margin-bottom: 10px; /* Space between each bullet point */
  }
`;

const NestedList = styled.ul`
  list-style-type: circle; /* Different bullet style for nested list */
  padding-left: 20px;
`;

const StyledListItem = styled.li`
  font-family: 'Roboto', sans-serif;
  font-weight: 400; /* Normal font weight */
  line-height: 1.6; /* Line height for better readability */
  color: var(--blue4); 
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
    display: none;
  }
`;

const MobileImageButton = styled.button`
  display: none;
  background-color: var(--blue);
  color: var(--white);
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 5px;

  @media (max-width: 768px) {
    display: block; /* Display on mobile screens */
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

const Tops = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  font-size: 26px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [modalImage, setModalImage] = useState(null); // State to store the image to be shown in the modal

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

  const openModalWithImage = () => {
    // Set the image based on the toggle (Ivory Pearl or Cozy Suite)
    const imageSrc = toggle === 1 ? <GhsSlider /> : <GhsSlider2 />;
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Tops>OUR APARTMENTS</Tops>
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
    <StyledList>
      <StyledListItem> Sophisticated design where elegance meets comfort.</StyledListItem>
      <StyledListItem> Luxurious apartment with classic décor and modern amenities.</StyledListItem>
      <StyledListItem> Relaxed and serene environment.</StyledListItem>
      <StyledListItem>
        Features:
        <NestedList>
          <StyledListItem>24-hour electricity.</StyledListItem>
          <StyledListItem>PlayStation 5 for entertainment.</StyledListItem>
          <StyledListItem>Daily housekeeping service.</StyledListItem>
          <StyledListItem>On-site restaurant serving delectable dishes.</StyledListItem>
        </NestedList>
      </StyledListItem>
      <StyledListItem> Ideal for both business and leisure stays.</StyledListItem>
      <StyledListItem> Perfect getaway for timeless luxury.</StyledListItem>
    </StyledList>
  </ShowMission>
)}

{toggle === 2 && (
  <ShowMission variants={containerVariants} initial="hidden" animate="visible">
    <motion.h3 variants={childVariants}>Cozy Suite</motion.h3>
    <StyledList>
      <StyledListItem>Inviting ambiance and cozy interior.</StyledListItem>
      <StyledListItem>Feels like a home away from home.</StyledListItem>
      <StyledListItem>
        Features:
        <NestedList>
          <StyledListItem>24-hour electricity.</StyledListItem>
          <StyledListItem>PlayStation 5 for entertainment.</StyledListItem>
          <StyledListItem>Daily housekeeping service.</StyledListItem>
          <StyledListItem>On-site restaurant catering to dining needs.</StyledListItem>
        </NestedList>
      </StyledListItem>
      <StyledListItem>Suitable for short getaways or longer stays.</StyledListItem>
      <StyledListItem>Provides ultimate comfort and convenience in a warm atmosphere.</StyledListItem>
    </StyledList>
  </ShowMission>
)}

          <MobileImageButton onClick={openModalWithImage}>
            View Image
          </MobileImageButton>
        </Overview>

        <SideImg>
          <SideImg2>
            {toggle === 1 && <GhsSlider />}
            {toggle === 2 && <GhsSlider2 />}
          </SideImg2>
        </SideImg>
      </Section2Container>

      {/* Modal for Mobile Image */}
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={closeModal} title={toggle === 1 ? "Ivory Pearl" : "Cozy Suite"}>
          {modalImage}
        </Modal>
      )}
    </Container>
  );
};

export default AboutSection1;