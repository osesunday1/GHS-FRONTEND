import AboutSection1 from "../components/Home/AboutSection1";
import Form from "../components/Home/Form";
import Header from "../components/Home/Header";
import Slider from "../components/Home/Slider";
import styled from "styled-components";


const StyledHome= styled.section`
  width: 100%;
`

const Home = () => {
  return (
    <StyledHome>
        <Header/>
        <Slider/>
        <AboutSection1/>
        <Form/>
    </StyledHome>
  );
}

export default Home;

